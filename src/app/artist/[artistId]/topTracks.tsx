import React, { useState } from "react";
import Image from "next/image";
import { topTrackProp } from "@/types/types";

export function millisToMinutesAndSeconds(millis: number): string {
  const minutes: number = Math.floor(millis / 60000);
  const seconds: string = ((millis % 60000) / 1000).toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const TopTracks = ({ topTracks }: any) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div className="px-4 z-[1] flex flex-col gap-3 items-start">
      <h2 className="mb-4 font-bold text-2xl">Popular</h2>
      {topTracks
        .slice(0, isShowMore ? 10 : 5)
        .map((e: topTrackProp, index: number) => (
          <div
            key={index}
            className="topTrackBox grid h-[56px] px-4 gap-4 w-full items-center text-[#B3B3B3]"
          >
            <p className="w-4 h-4 flex items-center justify-center">
              {index + 1}
            </p>
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
            <p className="text-sm">
              {millisToMinutesAndSeconds(e.duration_ms)}
            </p>
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
