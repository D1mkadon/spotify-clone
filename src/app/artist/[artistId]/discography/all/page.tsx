"use client";
import { fetchArtistAllAlbums } from "@/app/data/fetchData";
import { albumProp } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import PlayButton from "@/app/components/PlayButton";
import PlaylistComponent from "@/app/components/PlaylistComponent";

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
  const handleClick = () => {};
  return (
    <div className="flex flex-col mt-16 mx-6 min-h-[100vh] ">
      <h2 className="text-2xl  font-bold">{albumsData[0].artists[0].name}</h2>
      {albumsData.map((e: albumProp, index: number) => {
        return (
          <div key={index}>
            <div className="p-8 flex">
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
                  <PlayButton
                    bg="#ffffff"
                    MySize="32px"
                    handleClick={handleClick}
                  />
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
            <PlaylistComponent arrProp={e.tracks.items} />
          </div>
        );
      })}
    </div>
  );
};
export default page;
