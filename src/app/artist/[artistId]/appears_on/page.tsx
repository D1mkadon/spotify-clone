"use client";
import MusicCard from "@/app/components/MusicCard";
import { albumProp } from "@/types/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchArtistAlbums } from "@/app/data/fetchData";

const page = ({ params }: { params: { artistId: string } }) => {
  const [appears, setAppears] = useState<Array<albumProp>>([]);
  useEffect(() => {
    fetchArtistAlbums(params.artistId, setAppears, "appears_on");
  }, []);

  return (
    <div
      className="musicSection pt-16 px-6"
      style={{ gridAutoRows: "auto", gap: "24px" }}
    >
      {appears.map((value: albumProp, index: number) => (
        <Link href={`/album/${value.id}`} key={index}>
          <MusicCard
            imgProp={value.images[0].url}
            nameProp={value.name}
            albumType={value.type}
          />
        </Link>
      ))}
    </div>
  );
};
export default page;
