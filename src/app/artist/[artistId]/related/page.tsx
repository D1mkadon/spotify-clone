"use client";
import MusicCard from "@/app/components/MusicCard";
import { artistProp } from "@/types/types";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchRelatedArtists } from "@/app/data/fetchData";

const page = ({ params }: { params: { artistId: string } }) => {
  const [related, setRelated] = useState<Array<artistProp>>([]);
  useEffect(() => {
    fetchRelatedArtists(params.artistId, setRelated);
  }, []);

  return (
    <div
      className="musicSection px-6 mt-16"
      style={{ gridAutoRows: "auto", gap: "24px" }}
    >
      {related.map((value: artistProp, index: number) => (
        <Link href={`/artist/${value.id}`} key={index}>
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
