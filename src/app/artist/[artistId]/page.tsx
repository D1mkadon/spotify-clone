"use client";

import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
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
import { albumProp, artistProp, TrackProp } from "@/types/types";
import TourSection from "./TourSection";

const page = ({ params }: { params: { artistId: string } }) => {
 
  const [albums, setAlbums] = useState<Array<albumProp>>([]);
  const [appearsOn, setAppearsOn] = useState<Array<albumProp>>([]);
  const [found, setFound] = useState(false);
  const [topTracks, setTopTracks] = useState<TrackProp[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<artistProp[]>([]);
  const [artist, setArtist] = useState<artistProp>({
    name: "",
    images: [{ url: "" }],
    genres: [""],
    type: "",
    id: "",
    followers: {
      total: 0,
    },
  });

  useEffect(() => {
    fetchArtist(params.artistId, setArtist);
    fetchTopArtistTracks(params.artistId, setTopTracks);
    fetchRelatedArtists(params.artistId, setRelatedArtists);
    fetchArtistAlbums(
      params.artistId,
      setAlbums,
      "compilation,appears_on",
      setFound
    );
    fetchArtistAlbums(params.artistId, setAppearsOn, "appears_on");
  }, []);

  const handleClick = async (value: string) => {
    fetchArtistAlbums(params.artistId, setAlbums, value);
  };
  const handleClickPopular = async (value: string) => {
    await fetchArtistAlbums(params.artistId, setAlbums, value).then(() => {
      setAlbums((e) =>
        e.sort(function (a: albumProp, b: albumProp) {
          return b.total_tracks - a.total_tracks;
        })
      );
    });
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

      <div className="relative mt-16 px-2">
        <ArtistHeader
          imgUrl={artist.images[0].url}
          artistName={artist?.name}
          followers={artist.followers.total}
        />

        <TopTracks topTracks={topTracks} />

        <div className="w-full px-4">
          <BrowseAllComponent
            title="Discography"
            href={`/artist/${params.artistId}/discography/all`}
          />
          <AlbumSwitcher
            handleClick={handleClick}
            found={found}
            handleClickPopular={handleClickPopular}
          />
          <div className="musicSection">
            {albums.map((value: albumProp, index: number) => (
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
          <BrowseAllComponent
            title="On Tour"
            browseTitle="View all upcoming concerts"
            href={`/artist/${params.artistId}/related`}
          />
          <TourSection />
          <BrowseAllComponent
            title="Appears on"
            href={`/artist/${params.artistId}/related`}
          />
          <div className="musicSection">
            {!!appearsOn.length &&
              appearsOn.map((value: albumProp, index: number) => (
                <MusicCard
                  key={index}
                  nameProp={value.name}
                  descriptionProp={value.release_date.slice(0, 4)}
                  albumType={value.album_type}
                  imgProp={value.images[1].url}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
