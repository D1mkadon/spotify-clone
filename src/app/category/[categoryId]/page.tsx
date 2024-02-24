"use client";
import MusicCard from "@/app/components/MusicCard";
import { sessionProps } from "@/types/types";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type itemProp = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  images: [
    {
      url: string;
    }
  ];
  name: string;
  primary_color: string;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
};

interface categoryDataProps {
  message?: "Hip-Hop";
  playlists?: {};
}
const page = ({ params }: { params: { categoryId: string } }) => {
  const { status } = useSession({
    required: true,
  });
  const [categoryData, setCategoryData] = useState([{}]);
  const [playlist, setPlaylist] = useState<itemProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      axios
        .get(
          `https://api.spotify.com/v1/browse/categories/${params.categoryId}/playlists`,
          {
            headers: {
              Authorization: "Bearer " + (session as sessionProps).access_token,
            },
          }
        )
        .then((e) => {
          setCategoryData(e.data), setPlaylist(e.data.playlists.items);
          console.log(e.data);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);

  if (status === "loading" || !!categoryData.length) {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return (
      <div>
        <h1 className="text-8xl">
          {(categoryData as categoryDataProps).message}
        </h1>
        <div className="musicSection">
          {playlist.map((e, index) => (
            <MusicCard
              key={index}
              imgProp={e.images[0].url}
              nameProp={e.name}
              descriptionProp={e.description}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default page;
