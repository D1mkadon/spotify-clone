"use client";
import PlayButton from "@/app/components/PlayButton";
import { sessionProps } from "@/types/types";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ArtistHeader from "./artistHeader";
import TopTracks from "./topTracks";

type artistProp = {
  name: string;
  images: [{ url: string }];
};
export type topTrackProp = {
  name: string;
  duration_ms: number;
  album: { images: [{ url: string }] };
};
const page = ({ params }: { params: { artistId: string } }) => {
  const { status } = useSession({
    required: true,
  });
  const [topTracks, setTopTracks] = useState<topTrackProp[]>([]);
  const [artist, setArtist] = useState<artistProp>({
    name: "",
    images: [{ url: "" }],
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
    };
    fetchData();
  }, []);
  if (status === "loading" || artist.name.length < 1 || !topTracks.length) {
    return <p>loading...</p>;
  }
  if (status === "authenticated") {
    return (
      <>
        <div
          style={{ backgroundColor: "green", height: "582px" }}
          className="bgMain top-0 z-[0] rounded-lg "
        ></div>
        <div className="relative px-2">
          <ArtistHeader
            imgUrl={artist.images[0].url}
            artistName={artist?.name}
          />
          <TopTracks topTracks={topTracks} />
        </div>
      </>
    );
  }
};

export default page;
