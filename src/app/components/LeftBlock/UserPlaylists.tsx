import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AlbumSwitcherButton from "../../artist/[artistId]/albumSwitcherButton";
import Link from "next/link";
import { TrackProp, artistProp, likedProp, playlistProp } from "@/types/types";

const UserPlaylists = ({
  show,
  handleClick,
  playlists,
  followedArtists,
  liked,
}: {
  show: string;
  handleClick: (value: string) => void;
  playlists: playlistProp[];
  followedArtists: artistProp[];
  liked: likedProp;
}) => {
  const dropDownContent = useRef<HTMLInputElement>(null);
  const [searchShow, setSearchShow] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const handleSearchClick = () => {
    setSearchShow(true);
  };

  useEffect(() => {
    let handler = (e: Event) => {
      if (!dropDownContent.current?.contains(e.target as HTMLElement)) {
        setSearchShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, [searchShow]);
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
          className={`rounded-full group hover:bg-white/10 p-2 flex justify-center items-center bg-transparent ${
            searchShow ? "z-0" : "z-[1]"
          }`}
        >
          <Image
            src={"/search.svg"}
            alt=""
            width={16}
            height={16}
            className="opacity-60 cursor-pointer size-4 group-hover:opacity-[1] z-[1]"
          />
        </button>
        <div className="flex items-center">
          <input
            ref={dropDownContent}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="search in your library"
            className={`${
              searchShow ? "opacity-100 left-4" : "opacity-0"
            } transition-all text-sm text-[#a7a7a7] ease-in-out duration-300 absolute left-0 bg-white/10 outline-transparent py-1 px-7 w-[190px] rounded focus:outline-none mt-[2px] placeholder:text-[#a7a7a7] placeholder:capitalize placeholder:font-semibold placeholder:text-[12px]`}
          ></input>
          <div
            onClick={() => setInputValue("")}
            className={`rounded-full group hover:bg-white/10 absolute p-1 flex justify-center items-center bg-transparent ${
              !!inputValue.length ? "z-0 opacity-100" : "z-[1] opacity-0"
            }`}
          >
            <Image
              src={"/cross.svg"}
              alt=""
              width={16}
              height={16}
              className="opacity-60 cursor-pointer size-4 group-hover:opacity-[1] z-[1]"
            />
          </div>
        </div>
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
        {liked.items.length > 1 && (
          <Link
            href={`/collection/tracks`}
            className="flex items-center flex-row gap-3 h-16 cursor-pointer hover:bg-white/5 px-2 rounded"
          >
            <Image
              src={"https://misc.scdn.co/liked-songs/liked-songs-64.png"}
              alt={`liked icon`}
              width={48}
              height={48}
              className="object-fit size-12 rounded"
            />
            <div className="flex flex-col">
              <p className="text-base">Liked Songs</p>
              <span className="text-[#a7a7a7] text-[0.875rem] capitalize">
                <span className="">Playlist</span> {" • "}
                <span>
                  {liked.items.length}{" "}
                  {liked.items.length > 1 ? "songs" : "song"}
                </span>
              </span>
            </div>
          </Link>
        )}
        {!!inputValue.length ? (
          <>
            {(show === "all" || show === "Playlists") &&
              !!playlists.length &&
              playlists
                .filter((e) =>
                  e.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((e, index) => (
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
              followedArtists
                .filter((e) =>
                  e.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((e, index: number) => (
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default UserPlaylists;
