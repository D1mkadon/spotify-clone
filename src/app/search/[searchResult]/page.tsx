"use client";
import AlbumSwitcherButton from "@/app/artist/[artistId]/albumSwitcherButton";
import MusicCard from "@/app/components/MusicCard";
import millisToTime, { fetchSearch } from "@/app/data/fetchData";
import { searchDataProp } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";

const page = ({ params }: { params: { searchResult: string } }) => {
  const [searchData, setSearchData] = useState<searchDataProp>();
  useEffect(() => {
    fetchSearch(params.searchResult, setSearchData);
    const f = async () => {};
    f();
  }, []);

  console.log(searchData);
  if (
    !searchData?.albums.items.length ||
    !searchData?.artists.items.length ||
    !searchData?.tracks.items.length
  )
    return (
      <p className="min-h-[60vh] flex justify-center items-center">
        <span className="mt-16">Loading...</span>
      </p>
    );
  return (
    <div className="min-h-[60vh] mt-16 px-6">
      <div className="flex items-center h-12 pt-1">
        {buttonsArr.map((e: { text: string }, index) => (
          <AlbumSwitcherButton
            key={index}
            text={e.text}
            handleClick={() => {}}
            hrefText=""
            styles="text-sm capitalize"
          />
        ))}
      </div>
      <div className="grid mt-6 gap-y-8 gap-x-6 categoriesContainer">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold">Top result</h2>
          <div className="bg-[#181818] hover:bg-[#282828] flex flex-col rounded-lg p-5 gap-5">
            <Image
              src={searchData.artists.items[0].images[0].url}
              alt=""
              width={92}
              height={92}
              className="rounded-full size-[92px] shadow-[0_8px_24px_rgba(0,0,0,.5)]"
            />
            <div className="min-h-14">
              <h2 className="font-bold text-4xl pb-1">
                {searchData.artists.items[0].name}
              </h2>
              <p className="text-sm text-[#a7a7a7] capitalize">
                {searchData.artists.items[0].type}
              </p>
            </div>
          </div>
        </div>
        <div className="col-[3/_-1]">
          <h2 className="text-2xl font-bold capitalize">songs</h2>
          <div className="flex flex-col">
            {searchData.tracks.items.slice(0, 4).map((e, index: number) => (
              <div
                key={index}
                className="flex h-14 items-center justify-between px-4 group hover:bg-white/10 rounded-lg"
              >
                <div className="flex">
                  <Image
                    src={e.album.images[0].url}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 mr-3"
                  />
                  <div className="flex flex-col">
                    <p>{e.name}</p>
                    <Link
                      href={`/artist/${e.artists[0].id}`}
                      className="text-[#a7a7a7] hover:underline text-sm"
                    >
                      {e.artists[0].name}
                    </Link>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <Image
                    src={"/heart.svg"}
                    alt=""
                    width={32}
                    height={32}
                    className="opacity-0  size-8 mr-3 py-2 hover:opacity-100 cursor-pointer group-hover:opacity-70"
                  />
                  <p className="text-sm text-[#a7a7a7] mr-3">
                    {millisToTime(e.duration_ms)}
                  </p>
                  <Image
                    src={"/threedots.svg"}
                    alt=""
                    width={24}
                    height={24}
                    className="opacity-0 py-2 group-hover:opacity-100 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <section className=" col-span-full">
          <h2 className="text-2xl font-bold">Artists</h2>
          <div className="musicSection" style={{ columnGap: 0 }}>
            {searchData.artists.items.slice(0, 12).map((e, index) => (
              <Link href={`/artist/${e.id}`} key={index}>
                <ArtistCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  TypeProp={e.type}
                />
              </Link>
            ))}
          </div>
        </section>
        <section className=" col-span-full">
          <h2 className="text-2xl font-bold">Albums</h2>
          <div className="musicSection">
            {searchData.albums.items.slice(0, 12).map((e, index) => (
              <Link href={`/album/${e.id}`} key={index}>
                <MusicCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  descriptionProp={`${e.release_date.slice(0, 4)} • `}
                  ArtistProp={`${e.artists[0].name}`}
                  ArtistId={e.artists[0].id}
                />
              </Link>
            ))}
          </div>
        </section>
        <section className="col-span-full">
          <h2 className="text-2xl font-bold">Playlists</h2>
          <div className="musicSection">
            {searchData.playlists.items.slice(0, 12).map((e, index) => (
              <Link href={`/playlist/${e.id}`} key={index}>
                <MusicCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  descriptionProp={`By ${e.owner.display_name}`}
                />
              </Link>
            ))}
          </div>
        </section>
        <section className="col-span-full">
          <h2 className="text-2xl font-bold">Podcasts</h2>
          <div className="musicSection">
            {searchData.shows.items.slice(0, 12).map((e, index) => (
              <Link href={`/show/${e.id}`} key={index}>
                <MusicCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  descriptionProp={`${e.publisher}`}
                />
              </Link>
            ))}
          </div>
        </section>
        <section className=" col-span-full">
          <h2 className="text-2xl font-bold">Profiles</h2>
          <div className="musicSection" style={{ columnGap: 0 }}>
            {searchData.artists.items.slice(0, 12).map((e, index) => (
              <Link href={`/user/${e.id}`} key={index}>
                <ArtistCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  TypeProp={e.type}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;

const buttonsArr = [
  { text: "all" },
  { text: "artists" },
  { text: "songs" },
  { text: "playlists" },
  { text: "albums" },
  { text: "podcasts & shows" },
  { text: "profiles" },
];
