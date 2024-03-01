"use client";

import BrowseAllComponent from "@/app/components/BrowseAllComponent";
import MusicCard from "@/app/components/MusicCard";
import PlayButton from "@/app/components/PlayButton";
import PlaylistComponent from "@/app/components/PlaylistComponent";
import { fetchAlbumById, millisToHoursAndMinutes } from "@/app/data/fetchData";
import { albumProp } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "@/store/index";
import { useSession } from "next-auth/react";
const colors = [
  "rgb(104, 152, 184)",
  "rgb(240, 200, 208)",
  "rgb(232, 224, 224)",
  "rgb(83, 83, 83)",
  "rgb(192, 0, 24)",
  "rgb(128, 136, 176)",
  "rgb(240, 136, 96)",
  "rgb(176, 72, 128)",
];
const getColorBySongsCount = (songs: number) => {
  switch (true) {
    case songs <= 2:
      return colors[0];
    case songs <= 5:
      return colors[1];
    case songs <= 8:
      return colors[2];
    case songs <= 11:
      return colors[4];
    case songs <= 14:
      return colors[5];
    case songs <= 17:
      return colors[6];
    case songs <= 20:
      return colors[7];
    default:
      return colors[3];
  }
};
const page = ({ params }: { params: { albumId: string } }) => {
  const { data: session } = useSession();
  const snap = useSnapshot(state);
  const [albumDuration, setAlbumDuration] = useState<number>(0);
  const [moreAlbums, setMoreAlbums] = useState<Array<albumProp>>([]);
  const [album, setAlbum] = useState<albumProp>({
    name: "",
    id: "",
    images: [{ url: "" }],
    total_tracks: 0,
    type: "",
    album_group: "",
    album_type: "",
    release_date: "",
    artists: [{ name: "", id: "" }],
    tracks: {
      items: [
        {
          duration_ms: 0,
          name: "",
          track_number: 0,
          id: "",
          album: { images: [{ url: "" }] },
          artists: [{ id: "", name: "" }],
          uri: "",
        },
      ],
    },
  });
  useEffect(() => {
    fetchAlbumById(params.albumId, setAlbum, setAlbumDuration, setMoreAlbums);
  }, []);
  if (!album.name.length) {
    return <p>loading</p>;
  }
  const handleClick = async () => {
    state.trackID = album.tracks.items[0].id;
    state.isPlaying = true;
    if (session && session.access_token) {
      // const response = await fetch(
      //   "https://api.spotify.com/v1/me/player/play",
      //   {
      //     method: "PUT",
      //     headers: {
      //       Authorization: `Bearer ${session.access_token}`,
      //     },
      //     body: JSON.stringify({
      //       uris: [track.uri],
      //     }),
      //   }
      // );
      // console.log("on play", response.status);
    }
  };

  return (
    <div className="mt-16 relative min-h-[100vh] text-white text-4xl">
      <div className="flex justify-start items-end artistContainer relative bg-transparent px-6 pb-6">
        <div
          style={{
            background:
              "-webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.5))),var(--background-noise)",
            backgroundColor: getColorBySongsCount(album.total_tracks),
            height: "400px",
          }}
          className="bgMain top-0 rounded left-0 z-[0] "
        ></div>
        <div className="size-[232px] mr-6 relative">
          <img
            src={album.images[0].url}
            alt=""
            className="rounded cursor-pointer max-w-[232px] size-[232px] shadow-[0_4px_60px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="flex flex-col relative">
          <h1 className="text-3xl font-bold line-clamp-1">{album.name}</h1>
          <div className="mt-2 text-sm flex gap-1">
            <Link
              href={`/artist/${album.artists[0].id}`}
              className="hover:underline"
            >
              {album.artists[0].name}
            </Link>
            <span className="before:content-['•'] after:content-['•'] before:mx-1 after:mx-1">
              {album.release_date.slice(0, 4)}{" "}
            </span>
            <span>{album.total_tracks} songs,</span>
            <span>{millisToHoursAndMinutes(albumDuration)}</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          style={{
            backgroundColor: getColorBySongsCount(album.total_tracks),
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
        <PlaylistComponent arrProp={album.tracks.items} />
        <div className="text-[11px] flex gap-2 flex-col justify-start items-start mt-8 px-8 text-[#b3b3b3]">
          <span className="text-sm h-4">{album.release_date}</span>
          {!!album?.copyrights?.length &&
            album?.copyrights?.map((e, index) => {
              return (
                <span
                  key={index}
                  className="flex items-center justify-center h-3"
                >
                  {e.text}
                </span>
              );
            })}
        </div>
      </div>
      <div className="px-8 mt-10">
        <BrowseAllComponent
          title={`More by ${album.artists[0].name}`}
          href=""
        />
        <div className="musicSection">
          {moreAlbums.map((value: albumProp, index: number) => (
            <Link href={`/album/${value.id}`} key={index}>
              <MusicCard
                nameProp={value.name}
                descriptionProp={value.release_date.slice(0, 4)}
                albumType={value.album_type}
                imgProp={value.images[1].url}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
