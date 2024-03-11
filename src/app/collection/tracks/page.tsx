"use client";
import PlayButton from "@/app/components/PlayButton";
import { fetchLiked } from "@/app/data/fetchData";
import Playlist from "./Playlist";
import { likedProp } from "@/types/types";
import React, { useEffect, useState } from "react";

const page = () => {
  const [liked, setLiked] = useState<likedProp>({
    items: [
      {
        added_at: "",
        track: {
          uri: "",
          name: "",
          track_number: 0,
          id: "",
          album: { images: [{ url: "" }] },
          duration_ms: 0,
          artists: [],
        },
      },
    ],
    total: "",
  });
  useEffect(() => {
    fetchLiked(setLiked);
  }, []);
  const handleClick = () => {};
  return (
    <div className="mt-16 relative min-h-[60vh] text-white text-4xl">
      <div className="flex justify-start items-end artistContainer relative bg-transparent px-6 pb-6">
        <div
          style={{
            background:
              "-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise)",
            backgroundColor: "rgb(80, 56, 160)",
            height: "400px",
          }}
          className="bgMain top-0 rounded left-0 z-[0] "
        ></div>
        <div className="size-[232px] mr-6 relative">
          <img
            src={"https://misc.scdn.co/liked-songs/liked-songs-640.png"}
            alt=""
            className="rounded cursor-pointer max-w-[232px] size-[232px] shadow-[0_4px_60px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="flex flex-col relative">
          <h1 className="text-3xl font-bold line-clamp-1">Liked songs</h1>
          <div className="mt-2 text-sm flex gap-1"></div>
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            backgroundColor: "rgb(80, 56, 160)",
            backgroundImage: "linear-gradient()",
            height: "232px",
            marginTop: 0,
          }}
          className="bgMain top-0 z-[0] "
        ></div>
      </div>
      <div className="flex relative flex-row items-center w-full p-4">
        <div className="mr-8 px-2">
          <PlayButton bg="#1ed760" MySize="56px" handleClick={handleClick} />
        </div>
      </div>

      <div className="relative">
        {liked.items.length > 1 && <Playlist arrProp={liked.items} />}
        <div className="text-[11px] flex gap-2 flex-col justify-start items-start mt-8 px-8 text-[#b3b3b3]"></div>
      </div>
      <div className="px-8 mt-10">
        <div className="musicSection"></div>
      </div>
    </div>
  );
};

export default page;
