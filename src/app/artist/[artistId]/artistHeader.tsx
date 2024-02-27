import PlayButton from "@/app/components/PlayButton";
import Image from "next/image";
import React from "react";

interface artistHeadProps {
  imgUrl: string;
  artistName: string;
  followers: number;
}

const ArtistHeader = ({ imgUrl, artistName, followers }: artistHeadProps) => {
  return (
    <>
      <div className="flex justify-start items-end z-[1] artistContainer relative bg-transparent mt-4 px-6 pb-6">
        <div className="size-[232px] mr-6 relative">
          <Image
            src={imgUrl}
            alt=""
            width={232}
            height={232}
            sizes=""
            priority
            className="rounded-full shadow-[0_4px_60px_rgba(0,0,0,.5)]"
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
      <div className="flex flex-row items-center w-full p-4">
        <div className="mr-8">
          <PlayButton />
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
