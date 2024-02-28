import Image from "next/image";
import React from "react";
import millisToTime from "../data/fetchData";
import { TrackProp } from "@/types/types";

const PlaylistComponent = ({ arrProp }: { arrProp: Array<TrackProp> }) => {
  return (
    <div className="px-8 text-[#b3b3b3]">
      <div className="flex px-4 border-b h-[36px] mb-4 border-b-[hsla(0,0%,100%,.1)] gap-4">
        <p className="text-base">#</p>
        <p className="mr-auto text-sm"> Title</p>
        <Image src={"/clock.svg"} alt="clockIcon" width={16} height={16} />
      </div>
      {arrProp.map((value, index: number) => {
        return (
          <div
            key={index}
            className="flex justify-start items-center text-sm px-4 gap-4"
          >
            <span className="flex justify-center items-center size-4">
              {value.track_number}
            </span>
            <div className="mr-auto">
              <p className="text-white">{value.name}</p>
              <p className="text-[#b3b3b3]">{value.artists[0].name}</p>
            </div>
            <p>{millisToTime(value.duration_ms)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistComponent;
