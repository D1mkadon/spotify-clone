"use client";
import AlbumSwitcherButton from "@/app/artist/[artistId]/albumSwitcherButton";
import Star from "@/app/data/Icons/star";
import millisToTime, { fetchShows } from "@/app/data/fetchData";
import { showProp } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { showId: string } }) => {
  const [show, setShow] = useState<showProp>();
  useEffect(() => {
    fetchShows(params.showId, setShow);
  }, []);
  console.log(show);

  return (
    <div className="mt-16 relative min-h-[100vh] text-white text-4xl">
      <div className="flex justify-start items-end artistContainer relative bg-transparent px-6 pb-6">
        <div
          style={{
            background:
              "-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise)",
            backgroundColor: "gray",
            height: "400px",
          }}
          className="bgMain top-0 rounded left-0 z-[0] "
        ></div>
        <div className="size-[232px] mr-6 relative">
          {show === undefined ? null : (
            <img
              src={show.images[0].url}
              alt=""
              className="rounded cursor-pointer max-w-[232px] size-[232px] shadow-[0_4px_60px_rgba(0,0,0,.5)]"
            />
          )}
        </div>
        <div className="flex flex-col relative">
          <span className="text-sm capitalize">{show?.type}</span>
          <h1 className="text-8xl font-bold line-clamp-1">{show?.name}</h1>
          <h2 className="text-3xl font-bold line-clamp-1">{show?.publisher}</h2>
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            backgroundColor: "gray",
            backgroundImage: "linear-gradient()",
            height: "232px",
            marginTop: 0,
          }}
          className="bgMain top-0 z-[0] "
        ></div>
      </div>
      <div className="flex relative flex-row items-center w-full p-4">
        <button className="mr-4 ml-2 py-[3px] px-[15px] text-sm rounded-full font-bold bg-transparent box-border cursor-pointer inline-flex hover:scale-[1.04] items-center justify-center border border-[#878787] hover:border-white">
          follow
        </button>
        <button>...</button>
      </div>

      <div className="relative grid grid-cols-5 gap-x-[4%] px-5">
        {show?.episodes.items[0].duration_ms && (
          <div className="bg-white/5 col-span-3 flex flex-col p-4 rounded gap-y-2">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[#a7a7a7]">up next</p>
              <p className="text-sm">{show?.episodes.items[0].name}</p>
              <p className="text-sm text-[#a7a7a7]"> {show.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#a7a7a7]">
                {show?.episodes.items[0].description}
              </p>
              <p className="text-sm">
                {show?.episodes.items[0].release_date} •{" "}
                {millisToTime(show?.episodes.items[0].duration_ms)}
              </p>
            </div>
          </div>
        )}
        <div className="col-span-2">
          <h2 className="font-bold text-xl pl-0 py-4"> About</h2>
          <p className="text-sm text-[#a7a7a7] pb-6">{show?.description}</p>
          <div className="flex text-sm items-center">
            <AlbumSwitcherButton
              text={
                <p className="text-[14px] items-center flex flex-row gap-1">
                  <span>5</span>
                  <Star className="group-focus:text-black text-white" />
                  <span className="text-[#a7a7a7] group-focus:text-black ">
                    (5)
                  </span>
                </p>
              }
              handleClick={() => {}}
              hrefText=""
              styles="text-[14px] items-center capitalize"
            />
            <span className="mx-2 pb-2 pr-2"> •</span>
            <AlbumSwitcherButton
              text={"Musik"}
              handleClick={() => {}}
              hrefText=""
              styles="text-sm capitalize"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
