"use client";

import { sessionProps } from "@/types/types";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import ArtistHeader from "./artistHeader";
import TopTracks from "./topTracks";
import { getColorByGenre } from "@/app/data/cardsData";
import MusicCard from "@/app/components/MusicCard";

type artistProp = {
  name: string;
  images: [{ url: string }];
  genres: [string];
};
interface albumProp {
  name: string;
  images: [{ url: string }];
  type: string;
  release_date: string;
  album_type: string;
}
export type topTrackProp = {
  name: string;
  duration_ms: number;
  album: { images: [{ url: string }] };
};
const page = ({ params }: { params: { artistId: string } }) => {
  const { status } = useSession();
  const [albums, setAlbums] = useState<albumProp[]>([]);
  const [topTracks, setTopTracks] = useState<topTrackProp[]>([]);
  const [artist, setArtist] = useState<artistProp>({
    name: "",
    images: [{ url: "" }],
    genres: [""],
  });

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      axios
        .get(`https://api.spotify.com/v1/artists/${params.artistId}`, {
          headers: {
            Authorization: "Bearer " + (session as sessionProps).access_token,
          },
        })
        .then((e) => {
          setArtist(e.data);
          console.log("artist", e.data);
        })
        .catch((e) => console.log(e));
      axios
        .get(
          `https://api.spotify.com/v1/artists/${params.artistId}/top-tracks?market=ES`,
          {
            headers: {
              Authorization: "Bearer " + (session as sessionProps).access_token,
            },
          }
        )
        .then((e) => {
          console.log("top tracks", e.data), setTopTracks(e.data.tracks);
        });
      axios
        .get(
          `https://api.spotify.com/v1/artists/${params.artistId}/albums?market=ES&offset=0&include_groups=album`,
          {
            headers: {
              Authorization: "Bearer " + (session as sessionProps).access_token,
            },
          }
        )
        .then((e) => {
          console.log("Albums", e.data), setAlbums(e.data.items);
        });
    };
    fetchData();
  }, []);
  if (
    status === "loading" ||
    artist.name.length < 1 ||
    !topTracks.length ||
    !albums.length
  ) {
    return <p>loading...</p>;
  }
  const handleClick = async (value: string) => {
    const session = await getSession();
    axios
      .get(
        `https://api.spotify.com/v1/artists/${params.artistId}/albums?market=ES&offset=0&include_groups=${value}`,
        {
          headers: {
            Authorization: "Bearer " + (session as sessionProps).access_token,
          },
        }
      )
      .then((e) => {
        console.log("Albums", e.data), setAlbums(e.data.items);
      });
  };
  console.log(albums);
  return (
    <>
      <div
        style={{
          backgroundColor: getColorByGenre(artist.genres[0]),
          height: "582px",
        }}
        className="bgMain top-0 z-[0] rounded-lg "
      ></div>
      <div className="relative px-2">
        <ArtistHeader imgUrl={artist.images[0].url} artistName={artist?.name} />
        <TopTracks topTracks={topTracks} />
        <div className="w-full px-4">
          <div className="flex justify-start items-center text-sm mb-4">
            <button
              className="bg-[rgba(0,0,0,0.07  )] mr-2 mb-2"
              onClick={() => handleClick("appears_on")}
            >
              <span className="py-1 px-3 bg-[hsla(0,0%,100%,.07)] rounded-full">
                Popular Releases
              </span>
            </button>
            <button
              className="bg-[rgba(0,0,0,0.07  )] mr-2 mb-2"
              onClick={() => handleClick("album")}
            >
              <span className="py-1 px-3 bg-[hsla(0,0%,100%,.07)] rounded-full">
                Albums
              </span>
            </button>
            <button
              className="bg-[rgba(0,0,0,0.07)] mr-2 mb-2 "
              onClick={() => handleClick("single")}
            >
              <span className="py-1 px-3  bg-[hsla(0,0%,100%,.07)] rounded-full">
                Singles and EPs
              </span>
            </button>
            {/* <button
              className="bg-[rgba(0,0,0,0.07)] mr-2 mb-2"
              onClick={() => handleClick("compilation")}
            >
              <span className="py-1 px-3 bg-[hsla(0,0%,100%,.07)] rounded-full">
                Compilation
              </span>
            </button> */}
          </div>
          <div className="musicSection">
            {albums.map((value: albumProp, index: number) => (
              <MusicCard
                key={index}
                imgProp={value.images[0].url}
                nameProp={value.name}
                descriptionProp={value.release_date.slice(0, 4)}
                albumType={value.album_type}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
