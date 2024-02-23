import Image from "next/image";
import { cardsData } from "../data/cardsData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import MusicCard from "./MusicCard";
const MusicSection = () => {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!session?.access_token) return;
    axios
      .get("https://api.spotify.com/v1/browse/featured-playlists?limit=10", {
        headers: { Authorization: "Bearer " + session.access_token },
      })
      .then((e) => {
        // console.log(e.data);
        setPlaylists(e.data.playlists.items);
      })
      .catch((e) => console.log(e));
  }, [session]);
  useEffect(() => {
    if (!session?.access_token) return;
    axios
      .get("https://api.spotify.com/v1/browse/new-releases?limit=5", {
        headers: { Authorization: "Bearer " + session.access_token },
      })
      .then((e) => {
        console.log(e.data);
        setSongs(e.data.albums.items);
      })
      .catch((e) => console.log(e));
  }, [session]);

  return (
    <section className="">
      <div className="musicSection">
        {playlists.length
          ? playlists?.map((e, index) => (
              <MusicCard
                key={index}
                imgProp={e.images[0].url}
                nameProp={e.name}
                descriptionProp={e.description}
              />
            ))
          : cardsData.map((e, index) => (
              <MusicCard
                key={index}
                imgProp={e.img}
                nameProp={e.title}
                descriptionProp={e.description}
              />
            ))}
      </div>
      <div className="flex justify-between items-center w-full  h-[30px]">
        <a href="/" className="hover:underline text-[22px] pl-0">
          New albums Releases
        </a>
        <a href="/" className="hover:underline text-[#B3b3b3]">
          <span className="ml-2 mt-[2px] text-[13px]"> Show all</span>
        </a>
      </div>
      <div className="musicSection">
        {songs.length > 2
          ? songs.map((e, index) => (
              <MusicCard
                key={index}
                imgProp={e.images[0].url}
                nameProp={e.name}
                descriptionProp={e.artists[0].name}
              />
            ))
          : null}
      </div>
    </section>
  );
};

export default MusicSection;
