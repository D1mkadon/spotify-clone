"use client";
import { fetchArtistAllAlbums } from "@/app/data/fetchData";
import { albumProp } from "@/types/types";
import { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col mx-6">
      <h2 className="text-2xl font-bold">NAME</h2>
      {albumsData.map((e: albumProp, index: number) => {
        return <div key={index}> {e.name}</div>;
      })}
    </div>
  );
};
export default page;
