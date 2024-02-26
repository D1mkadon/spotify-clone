"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ArtistHeader from "./artistHeader";
import TopTracks from "./topTracks";
import { getColorByGenre } from "@/app/data/cardsData";
import MusicCard from "@/app/components/MusicCard";
import AlbumSwitcher from "./albumSwitcher";
import Link from "next/link";
import BrowseAllComponent from "@/app/components/BrowseAllComponent";
import {
  fetchArtist,
  fetchArtistAlbums,
  fetchRelatedArtists,
  fetchTopArtistTracks,
} from "@/app/data/fetchData";
import { albumProp, artistProp, topTrackProp } from "@/types/types";
const initialAlbum = {
  name: "",
  images: [{ url: "" }, { url: "" }, { url: "" }],
  type: "",
  release_date: "",
  album_type: "",
  album_group: "",
};

const page = ({ params }: { params: { artistId: string } }) => {
  const { status } = useSession();
  const [albums, setAlbums] = useState<Array<albumProp>>([initialAlbum]);
  const [found, setFound] = useState(false);
  const [topTracks, setTopTracks] = useState<topTrackProp[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<artistProp[]>([]);
  const [artist, setArtist] = useState<artistProp>({
    name: "",
    images: [{ url: "" }],
    genres: [""],
    type: "",
    id: "",
  });

  useEffect(() => {
    fetchArtist(params.artistId, setArtist);
    fetchTopArtistTracks(params.artistId, setTopTracks);
    fetchRelatedArtists(params.artistId, setRelatedArtists);
    fetchArtistAlbums(
      params.artistId,
      setAlbums,
      setFound,
      "compilation,appears_on"
    );
  }, []);
  if (
    status === "loading" ||
    artist.name.length < 1 ||
    !topTracks.length ||
    !albums.length
  ) {
    return <p>loading...</p>;
  }
  const handleClick = async (value: string) => {
    fetchArtistAlbums(params.artistId, setAlbums, setFound, value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: getColorByGenre(artist.genres[0]),
          height: "582px",
        }}
        className="bgMain top-0 z-[0] rounded-lg "
      ></div>
      <div className="relative px-2">
        <ArtistHeader imgUrl={artist.images[0].url} artistName={artist?.name} />
        <TopTracks topTracks={topTracks} />
        <div className="w-full px-4">
          <BrowseAllComponent title=" Discography" href="/" />
          <AlbumSwitcher handleClick={handleClick} found={found} />
          <div className="musicSection">
            {!!albums.length &&
              albums.map((value: albumProp, index: number) => (
                <MusicCard
                  key={index}
                  nameProp={value.name}
                  descriptionProp={value.release_date.slice(0, 4)}
                  albumType={value.album_type}
                  imgProp={value.images[1].url}
                />
              ))}
          </div>
          <BrowseAllComponent
            title="Fans also like"
            href={`/artist/${params.artistId}/related`}
          />
          <div className="musicSection">
            {relatedArtists.map((value: artistProp, index: number) => (
              <Link href={`/artist/${value.id}`} key={index}>
                <MusicCard
                  imgProp={value.images[1].url}
                  nameProp={value.name}
                  albumType={value.type}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
