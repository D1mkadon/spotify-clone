"use client";
import { fetchArtistAllAlbums } from "@/app/data/fetchData";
import { albumProp } from "@/types/types";
import { useEffect, useState } from "react";
import { millisToMinutesAndSeconds } from "../../topTracks";
import Image from "next/image";
import PlayButton from "@/app/components/PlayButton";

const page = ({ params }: { params: { artistId: string } }) => {
  const [albumsData, setAlbumsData] = useState<Array<albumProp>>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchArtistAllAlbums(
        params.artistId,
        setAlbumsData,
        "album,single"
      );
    };
    fetchData();
  }, []);
  if (albumsData.length < 1) {
    return <div className="flex justify-center items-center">loading</div>;
  }

  console.log(albumsData);
  return (
    <div className="flex flex-col mx-6 min-h-[100vh] mt-[64px] ">
      <h2 className="text-2xl font-bold">{albumsData[0].artists[0].name}</h2>
      {albumsData.map((e: albumProp, index: number) => {
        return (
          <>
            <div key={index} className="p-8 flex">
              <img src={e.images[1].url} className="size-[132px]" alt="" />
              <div className="ml-6 text-[#b3b3b3] text-sm">
                <h3 className="font-bold text-3xl text-white">{e.name}</h3>
                <div className="flex">
                  <p className="capitalize after:content-['•'] after:mx-1">
                    {e.album_type}
                  </p>
                  <p className="capitalize after:content-['•'] after:mx-1">
                    {e.release_date.slice(0, 4)}
                  </p>
                  <p className="capitalize">{e.total_tracks} songs</p>
                </div>
                <div className="flex items-center mt-7 h-[48px] gap-4">
                  <PlayButton bg="#ffffff" MySize="32px" />
                  <button className="hover:scale-[1.04] opacity-40 hover:opacity-100">
                    <Image src={"/heart.svg"} alt="/" width={24} height={24} />
                  </button>
                  <button className="hover:scale-[1.04] opacity-40 hover:opacity-100">
                    <Image
                      src={"/threedots.svg"}
                      alt="/"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-8 text-[#b3b3b3]">
              <div className="flex px-4 border-b h-[36px] mb-4 border-b-[hsla(0,0%,100%,.1)] gap-4">
                <p className="text-base">#</p>
                <p className="mr-auto text-sm"> Title</p>
                <Image
                  src={"/clock.svg"}
                  alt="clockIcon"
                  width={16}
                  height={16}
                />
              </div>
              {e.tracks.items.map((value: any) => {
                return (
                  <div className="flex justify-start items-center text-sm px-4 gap-4">
                    <span className="flex justify-center items-center size-4">
                      {value.track_number}
                    </span>
                    <div className="mr-auto">
                      <p className="text-white">{value.name}</p>
                      <p className="text-[#b3b3b3]">{value.artists[0].name}</p>
                    </div>
                    <p>{millisToMinutesAndSeconds(value.duration_ms)}</p>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default page;
