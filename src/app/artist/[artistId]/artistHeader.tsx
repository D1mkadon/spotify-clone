import PlayButton from "@/app/components/PlayButton";
import state from "@/store";
import Image from "next/image";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";

interface artistHeadProps {
  imgUrl: string;
  artistName: string;
  followers: number;
  topTracks: any;
}

const ArtistHeader = ({
  imgUrl,
  artistName,
  followers,
  topTracks,
}: artistHeadProps) => {
  const snap = useSnapshot(state);
  const handleClick = () => {
    state.trackID = topTracks[0].id;
    state.isPlaying = true;
  };
  return (
    <>
      <div className="flex justify-start items-end z-[1] artistContainer relative bg-transparent px-6 pb-6">
        <div className="size-[232px] mr-6 relative">
          <img
            src={imgUrl}
            alt=""
            className="rounded-full max-w-[232px] size-[232px] shadow-[0_4px_60px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-8xl font-bold ">{artistName}</h1>
          <p className="mt-2">
            {followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            followers
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center relative w-full p-4 z-[1]">
        <div className="mr-8">
          <PlayButton bg="#1ed760" MySize="56px" handleClick={handleClick} />
        </div>

        <button className="mr-4 py-[3px] px-[15px] text-sm rounded-full font-bold bg-transparent box-border cursor-pointer inline-flex hover:scale-[1.04] items-center justify-center border border-[#878787] hover:border-white">
          follow
        </button>
        <button>...</button>
      </div>
    </>
  );
};

export default ArtistHeader;
