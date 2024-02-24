"use client";
import { useEffect, useState } from "react";
import { cardsData } from "../data/cardsData";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import MusicCard from "./MusicCard";
import { sessionProps } from "@/types/types";

type Album = {
  artists: [
    {
      name: string;
    }
  ];
  images: [
    {
      url: string;
    }
  ];

  name: string;
  description: string;
};

const MusicSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  useEffect(() => {
    if (status !== "authenticated") return;
    const fetchData = async () => {
      const session = await getSession();
      console.log(session);
      axios
        .get("https://api.spotify.com/v1/browse/featured-playlists?limit=10", {
          headers: {
            Authorization: "Bearer " + (session as sessionProps).access_token,
          },
        })
        .then((e) => setPlaylists(e.data.playlists.items))
        .catch((e) => console.log("catched ", e));
      axios
        .get("https://api.spotify.com/v1/browse/new-releases?limit=5", {
          headers: {
            Authorization: "Bearer " + (session as sessionProps).access_token,
          },
        })
        .then((e) => {
          setSongs(e.data.albums.items);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bgMain rounded-lg"></div>
      <section className="MusicContainer font-bold ">
        <section className="">
          {playlists.length ? (
            <>
              <div className="flex relative justify-between items-center w-full z-[1] h-[30px]">
                <a href="/" className="hover:underline text-[22px] pl-0">
                  Spotify Playlists
                </a>
                <a href="/" className="hover:underline text-[#B3b3b3]">
                  <span className="ml-2 mt-[2px] text-[13px]"> Show all</span>
                </a>
              </div>
              <div className="musicSection">
                {playlists?.map((e: Album, index) => (
                  <MusicCard
                    key={index}
                    imgProp={e.images[0].url}
                    nameProp={e.name}
                    descriptionProp={e.description}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="musicSection">
              {cardsData.map((e, index) => (
                <MusicCard
                  key={index}
                  imgProp={e.img}
                  nameProp={e.title}
                  descriptionProp={e.description}
                />
              ))}
            </div>
          )}

          {songs.length > 2 && (
            <>
              <div className="flex justify-between items-center w-full  h-[30px]">
                <a href="/" className="hover:underline text-[22px] pl-0">
                  New albums Releases
                </a>
                <a href="/" className="hover:underline text-[#B3b3b3]">
                  <span className="ml-2 mt-[2px] text-[13px]"> Show all</span>
                </a>
              </div>
              <div className="musicSection">
                {songs.map((e: Album, index) => (
                  <MusicCard
                    key={index}
                    imgProp={e.images[0].url}
                    nameProp={e.name}
                    descriptionProp={e.artists[0].name}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default MusicSection;
