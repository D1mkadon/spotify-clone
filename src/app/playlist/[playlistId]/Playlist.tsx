import Image from "next/image";
import React from "react";

import { TrackProp, playlistTrackProp } from "@/types/types";

import state from "@/store";
import { useSnapshot } from "valtio";
import Triangle from "@/app/data/Icons/triangle";
import millisToTime from "@/app/data/fetchData";

const Playlist = ({ arrayProp }: { arrayProp: Array<playlistTrackProp> }) => {
  const snap = useSnapshot(state);
  const handleClick = (value: TrackProp) => {
    state.trackID = value.id;
    state.isPlaying = true;
  };
  return (
    <div className="px-8 text-[#b3b3b3]">
      <div className="flex px-4 border-b h-[36px] mb-4 border-b-[hsla(0,0%,100%,.1)] gap-4">
        <p className="text-base">#</p>
        <p className="mr-auto text-sm"> Title</p>
        <Image src={"/clock.svg"} alt="clockIcon" width={16} height={16} />
      </div>
      {arrayProp.map((value, index: number) => {
        return (
          <div
            key={index}
            className="flex hover:bg-white/10 h-14 rounded group justify-start items-center text-sm px-4 gap-4"
          >
            <span className="flex justify-center items-center size-4 group-hover:hidden">
              {index + 1}
            </span>
            <button
              onClick={() => handleClick(value.track)}
              className="hidden justify-center items-center size-4 group-hover:flex text-white"
            >
              <Triangle className="text-white" />
            </button>

            <div className="mr-auto">
              <p className="text-white">{value.track.name}</p>
              <p className="text-[#b3b3b3]">{value.track.artists[0].name}</p>
            </div>
            <p>{millisToTime(value.track.duration_ms)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
