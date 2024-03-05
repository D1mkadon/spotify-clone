import Image from "next/image";
import React from "react";
import AlbumSwitcherButton from "../../artist/[artistId]/albumSwitcherButton";
import Link from "next/link";
import { artistProp, playlistProp } from "@/types/types";

const UserPlaylists = ({
  show,
  handleClick,
  playlists,
  followedArtists,
}: {
  show: string;
  handleClick: (value: string) => void;
  playlists: playlistProp[];
  followedArtists: artistProp[];
}) => {
  const handleSearchClick = () => {};
  return (
    <div className=" flex flex-col gap-0">
      <div className="h-12 px-2 flex mr-4 items-center">
        {(show === "Playlists" || show === "Artists") && (
          <button
            className={`bg-[rgba(0,0,0,0.07  )] mr-2 mb-2 group`}
            onClick={() => handleClick("all")}
          >
            <div className="py-2 px-2 transition-all ease-in-out duration-200 bg-[hsla(0,0%,100%,.07)] rounded-full group-focus:bg-white group-focus:text-black group-hover:bg-[hsla(0,0%,100%,.2)]">
              <Image
                src={"/cross.svg"}
                width={16}
                height={16}
                alt="cross icon"
              />
            </div>
          </button>
        )}
        {(show === "all" || show === "Playlists") && (
          <AlbumSwitcherButton
            text="Playlists"
            hrefText="Playlists"
            handleClick={handleClick}
            styles="text-sm"
          />
        )}
        {(show === "all" || show === "Artists") && (
          <AlbumSwitcherButton
            text="Artists"
            hrefText="Artists"
            handleClick={handleClick}
            styles="text-sm"
          />
        )}
      </div>
      <div className="flex justify-between px-2 mb-2">
        <button
          onClick={handleSearchClick}
          className="rounded-full group hover:bg-white/10 p-2 flex justify-center items-center bg-transparent"
        >
          <Image
            src={"/search.svg"}
            alt=""
            width={16}
            height={16}
            className="opacity-60 cursor-pointer size-4 group-hover:opacity-[1]"
          />
        </button>
        <button className="opacity-80 group flex flex-row items-center hover:scale-[1.04] hover:opacity-100 py-1 pl-4 pr-3">
          <p className="text-sm font-light"> Recents</p>
          <Image
            src={"/list.svg"}
            alt=""
            width={16}
            height={16}
            className="cursor-pointer size-4 ml-[5px] opacity-80 group-hover:opacity-100"
          />
        </button>
      </div>
      <div>
        {(show === "all" || show === "Playlists") &&
          !!playlists.length &&
          playlists.map((e, index: number) => (
            <Link
              href={`/playlist/${e.id}`}
              key={index}
              className="flex items-center flex-row gap-3 h-16 cursor-pointer hover:bg-white/5 px-2 rounded"
            >
              <Image
                src={e.images[0].url}
                alt={`${e.name} image`}
                width={48}
                height={48}
                className="object-fit size-12 rounded"
              />
              <div className="flex flex-col">
                <p className="text-base">{e.name}</p>
                <span className="text-[#a7a7a7] text-[0.875rem] capitalize">
                  <span className="">{e.type}</span> {" • "}
                  <span>{e.owner.display_name}</span>
                </span>
              </div>
            </Link>
          ))}
        {(show === "all" || show === "Artists") &&
          !!followedArtists.length &&
          followedArtists.map((e, index: number) => (
            <Link
              href={`/artist/${e.id}`}
              key={index}
              className="flex items-center flex-row gap-3 h-16 cursor-pointer hover:bg-white/5 px-2 rounded"
            >
              <Image
                src={e.images[1].url}
                alt={`${e.name} image`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-base">{e.name}</p>
                <div className="text-[#a7a7a7] text-[0.875rem] capitalize">
                  <span> {e.type}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default UserPlaylists;
