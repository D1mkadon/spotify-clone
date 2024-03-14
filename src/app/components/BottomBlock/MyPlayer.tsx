import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import millisToTime, {
  fetchCurrentlyPlay,
  fetchNext,
  fetchPrevious,
  fetchSongInfo,
} from "../../data/fetchData";
import { TrackProp } from "@/types/types";
import { getSession, useSession } from "next-auth/react";
import { useSnapshot } from "valtio";
import state from "@/store";
import PlayBottomButton from "./PlayButton";
import axios from "axios";

const MyPlayer = () => {
  const snap = useSnapshot(state);
  const [track, setTrack] = useState<TrackProp>();
  const [progress, setProgress] = useState();
  const { data: session } = useSession();
  useEffect(() => {
    //fetch song details and play song
    async function f() {
      const session = await getSession();
      axios
        .get("https://api.spotify.com/v1/me/player/devices", {
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        })
        .then((e) => (state.device = e.data.devices[0].id));
      if (session?.access_token && session) {
        if (!state.trackID.length) {
          return fetchCurrentlyPlay(setProgress);

          //get the currently playing song from spotify
        } else {
          //get song info
          return fetchSongInfo(state.trackID, setTrack);
        }
      }
    }
    f();
  }, [state.trackID]);
  const handleClick = async () => {
    const data = await axios.get(
      `https://api.spotify.com/v1/me/player/currently-playing?market=ES`,
      {
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      }
    );
    if (data.data.is_playing) {
      const response = await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        }
      );
      if (response.status === 204) {
        state.isPlaying = false;
      }
    } else {
      console.log(data);

      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${state.device}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            uris: [track?.uri],
            position_ms: data.data.progress_ms,
          }),
        }
      );
      if (response.status === 204) {
        state.isPlaying = true;
        state.trackID = data.data.item.id;
      }
    }

    //pause unpause
  };
  const handleNext = async () => {
    fetchNext();
  };
  const handlePrevious = async () => {
    fetchPrevious();
  };

  return (
    <div className="col-span-2 sticky bottom-2 flex justify-between items-center h-[57px] w-full flex-row z-[5] bg-transparent">
      <div className="w-[30%] min-w-[180px] flex h-full items-center justify-start relative pl-2">
        {track?.album.images[0].url ? (
          <Image
            src={track?.album.images[0].url || ""}
            alt=""
            width={56}
            height={56}
            className="bg-gray-500/10 size-14 mr-2 rounded"
          />
        ) : (
          <div className=" size-14 mr-2 rounded"></div>
        )}
        {track?.name && (
          <>
            <div className="text-white flex flex-col mx-2">
              <Link
                href=""
                className="hover:underline line-clamp-1 cursor-pointer text-sm"
              >
                {track?.name}
              </Link>
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
          </>
        )}
      </div>
      <div className="w-[40%] max-w-[722px]">
        <div className="flex flex-col justify-center items-center">
          <div className="gap-4 mb-2 flex w-full flex-row flex-nowrap">
            <div className="flex justify-end flex-[1] gap-2">
              <button className="size-8">
                <Image src={"/shuffle.svg"} alt="" width={16} height={16} />
              </button>
              <button
                className="size-8 opacity-80 hover:opacity-100"
                onClick={handlePrevious}
              >
                <Image src={"/previous.svg"} alt="" width={16} height={16} />
              </button>
            </div>
            <PlayBottomButton
              bg="#fff"
              MySize={"32px"}
              handleClick={handleClick}
            />
            <div className="flex gap-2 flex-[1]">
              <button
                className="size-8 opacity-80 hover:opacity-100"
                onClick={handleNext}
              >
                <Image src={"/next.svg"} alt="" width={16} height={16} />
              </button>
              <button className="size-8">
                <Image src={"/loop.svg"} alt="" width={16} height={16} />
              </button>
            </div>
          </div>
          <div className="w-full flex-row gap-2 items-center justify-between flex text-[#a7a7a7] text-[0.75rem]">
            <div className="min-w-10 text-right">
              {progress ? millisToTime(progress) : "0:00"}
            </div>
            <div className="h-3 w-full relative"></div>
            <div className="min-w-10 text-left">
              {track?.duration_ms ? millisToTime(track.duration_ms) : "0:00"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center flex-grow-[1] ">
        <p className=" opacity-80 hover:opacity-100 size-8 p-2 cursor-pointer">
          <Image src={"/queue.svg"} alt="" width={16} height={16} />
        </p>
      </div>
    </div>
  );
};

export default MyPlayer;
