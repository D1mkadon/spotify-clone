"use client";

import PlayButton from "@/app/components/PlayButton";

import { fetchPlaylistById } from "@/app/data/fetchData";
import { playlistProp } from "@/types/types";

import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "@/store/index";
import { useSession } from "next-auth/react";
import Playlist from "./Playlist";

const page = ({ params }: { params: { playlistId: string } }) => {
  const { data: session } = useSession();
  const snap = useSnapshot(state);
  const [playlist, setPlaylist] = useState<playlistProp>();
  useEffect(() => {
    fetchPlaylistById(params.playlistId, setPlaylist);
    console.log(playlist);
  }, []);
  if (!playlist?.tracks?.items) {
    return <p>loading</p>;
  }
  const handleClick = async () => {
    if (session && session.access_token) {
    }
  };
  console.log(playlist);

  return (
    <div className="mt-16 relative min-h-[100vh] text-white text-4xl">
      <div className="flex justify-start items-end artistContainer relative bg-transparent px-6 pb-6">
        <div
          style={{
            background:
              "-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise)",
            backgroundColor: playlist.primary_color,
            height: "400px",
          }}
          className="bgMain top-0 rounded left-0 z-[0] "
        ></div>
        <div className="size-[232px] mr-6 relative">
          <img
            src={playlist.images[0].url}
            alt=""
            className="rounded cursor-pointer max-w-[232px] size-[232px] shadow-[0_4px_60px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="flex flex-col relative">
          <h1 className="text-3xl font-bold line-clamp-1">{playlist.name}</h1>
          <div className="mt-2 text-sm flex gap-1">
            {playlist.owner.display_name}

            {/* <span className="before:content-['•'] after:content-['•'] before:mx-1 after:mx-1">
              {playlist.release_date.slice(0, 4)}{" "}
            </span>
            <span>{playlist.total_tracks} songs,</span>
            <span>{millisToHoursAndMinutes(albumDuration)}</span> */}
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            backgroundColor: playlist.primary_color,
            backgroundImage: "linear-gradient()",
            height: "232px",
            marginTop: 0,
          }}
          className="bgMain top-0 z-[0] "
        ></div>
      </div>
      <div className="flex relative flex-row items-center w-full p-4">
        <div className="mr-8">
          <PlayButton bg="#1ed760" MySize="56px" handleClick={handleClick} />
        </div>

        <button className="mr-4 py-[3px] px-[15px] text-sm rounded-full font-bold bg-transparent box-border cursor-pointer inline-flex hover:scale-[1.04] items-center justify-center border border-[#878787] hover:border-white">
          follow
        </button>
        <button>...</button>
      </div>

      <div className="relative">
        {!!playlist?.tracks?.items && (
          <Playlist arrayProp={playlist.tracks.items} />
        )}
        <div className="text-[11px] flex gap-2 flex-col justify-start items-start mt-8 px-8 text-[#b3b3b3]">
          {/* <span className="text-sm h-4">{playlist.release_date}</span> */}
        </div>
      </div>
      <div className="px-8 mt-10">
        {/* <BrowseAllComponent
          title={`More by ${playlist.artists[0].name}`}
          href=""
        /> */}
        <div className="musicSection">
          {/* {moreAlbums.map((value: albumProp, index: number) => (
            <Link href={`/album/${value.id}`} key={index}>
              <MusicCard
                nameProp={value.name}
                descriptionProp={value.release_date.slice(0, 4)}
                albumType={value.album_type}
                imgProp={value.images[1].url}
              />
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default page;
