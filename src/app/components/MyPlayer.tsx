import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import Link from "next/link";
import millisToTime, {
  fetchCurrentlyPlay,
  fetchSongInfo,
} from "../data/fetchData";
import { TrackProp, playbackProp } from "@/types/types";
import { useSession } from "next-auth/react";
import { useSnapshot } from "valtio";
import state from "@/store";

const MyPlayer = () => {
  const snap = useSnapshot(state);
  const { data: session } = useSession();
  const [playback, setPlayback] = useState<playbackProp>();
  const [track, setTrack] = useState<TrackProp>();
  useEffect(() => {
    //fetch song details and play song
    async function f() {
      if (session?.access_token && session) {
        if (!snap.trackID.length) {
          fetchCurrentlyPlay(setPlayback);
          //get the currently playing song from spotify
        } else {
          //get song info
          fetchSongInfo(snap.trackID, setTrack);
        }
      }
    }
    f();
  }, [snap.trackID]);
  const handleClick = () => {};
  return (
    <div className="col-span-2 sticky bottom-2 flex justify-between items-center h-[57px] w-full flex-row z-[1]   bg-transparent">
      <div className="w-[30%] min-w-[180px] flex h-full items-center justify-start relative pl-2">
        {track?.album.images[0].url ? (
          <Image
            src={track?.album.images[0].url || ""}
            alt=""
            width={56}
            height={56}
            className="bg-blue-500 size-14 mr-2 rounded"
          />
        ) : (
          <div className="bg-gray-500 size-14 mr-2 rounded"></div>
        )}
        <div className="text-white flex flex-col mx-2">
          {track?.name && (
            <Link href="" className="hover:underline cursor-pointer text-sm">
              {track?.name}
            </Link>
          )}
          {track?.artists[0].name && (
            <Link
              href={`/artist/${track?.artists[0].id}`}
              className="hover:underline hover:opacity-100 opacity-70 cursor-pointer text-[12px]"
            >
              {track?.artists[0].name}
            </Link>
          )}
        </div>
        <span className="opacity-80 hover:opacity-100 cursor-pointer">
          <Image src={"/heart.svg"} width={16} height={16} alt="" />
        </span>
      </div>
      <div className="w-[40%] max-w-[722px]">
        <div className="flex flex-col justify-center items-center">
          <div className="gap-4 mb-2 flex w-full flex-row flex-nowrap">
            <div className="flex justify-end flex-[1] gap-2">
              <button className="size-8">
                <Image src={"/shuffle.svg"} alt="" width={16} height={16} />
              </button>
              <button className="size-8">
                <Image src={"/previous.svg"} alt="" width={16} height={16} />
              </button>
            </div>
            <PlayButton bg="#fff" MySize={"32px"} handleClick={handleClick} />
            <div className="flex gap-2 flex-[1]">
              <button className="size-8">
                <Image src={"/next.svg"} alt="" width={16} height={16} />
              </button>
              <button className="size-8">
                <Image src={"/loop.svg"} alt="" width={16} height={16} />
              </button>
            </div>
          </div>
          <div className="w-full flex-row gap-2 items-center justify-between flex text-[#a7a7a7] text-[0.75rem]">
            <div className="min-w-10 text-right">
              {/* {playback?.progress_ms
                ? millisToTime(playback?.progress_ms)
                : "0:00"} */}
            </div>
            <div className="h-3 w-full relative"></div>
            <div className="min-w-10 text-left">
              {/* {playback?.item.duration_ms
                ? millisToTime(playback?.item.duration_ms)
                : "0:00"} */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center flex-grow-[1]">1</div>
    </div>
  );
};

export default MyPlayer;
