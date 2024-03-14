import React, { useState } from "react";
import Image from "next/image";
import { TrackProp } from "@/types/types";
import millisToTime from "@/app/data/fetchData";
import Triangle from "@/app/data/Icons/triangle";
import state from "@/store";
import { useSession } from "next-auth/react";

const TopTracks = ({ topTracks }: any) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { data: session } = useSession();
  const handleClick = async (e: TrackProp) => {
    state.trackID = e.id;
    state.isPlaying = true;
    if (session && session.access_token) {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${state.device}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            uris: [e.uri],
          }),
        }
      );
      console.log("e.uri", e.uri);
      console.log("on play", response.status);
    }
  };
  return (
    <div className="px-4 z-[1] flex relative flex-col gap-3 items-start">
      <h2 className="mb-4 font-bold text-2xl">Popular</h2>
      {topTracks
        .slice(0, isShowMore ? 10 : 5)
        .map((e: TrackProp, index: number) => (
          <div
            key={index}
            className="topTrackBox group grid h-[56px] px-4 gap-4 w-full items-center text-[#B3B3B3] hover:bg-white/10"
          >
            <p className="w-4 h-4 flex items-center justify-center group-hover:hidden">
              {index + 1}
            </p>
            <button
              onClick={() => handleClick(e)}
              className="w-4 h-4 hidden items-center justify-center group-hover:flex"
            >
              <Triangle className="text-white" />
            </button>
            <div className="flex justify-start items-center text-white">
              <Image
                src={e.album.images[0].url}
                alt=""
                width={40}
                height={40}
                className="rounded mr-2"
              />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {e.name}
              </div>
            </div>
            <p>listeners</p>
            <p className="text-sm">{millisToTime(e.duration_ms)}</p>
          </div>
        ))}
      <button
        className="p-4 text-sm"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show less" : "See more"}
      </button>
    </div>
  );
};

export default TopTracks;
