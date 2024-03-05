"use client";
import { useEffect, useState } from "react";
import { cardsData } from "../data/cardsData";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";

import { albumProp, sessionProps } from "@/types/types";
import MusicCard from "./MusicCard";
import BrowseAllComponent from "./BrowseAllComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecentlyProp {
  track: {
    id: string;
    name: string;
    artists: [
      {
        name: string;
        id: string;
      }
    ];
    album: {
      name: string;
      images: [
        {
          url: string;
        }
      ];
    };
  };
}

const MusicSection = () => {
  const [playlists, setPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyProp[]>([]);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  useEffect(() => {
    if (status !== "authenticated") return;
    const fetchData = async () => {
      const session = await getSession();
      axios
        .get(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=10&offset=7",
          {
            headers: {
              Authorization: "Bearer " + session?.access_token,
            },
          }
        )
        .then((e) => setPlaylists(e.data.playlists.items))
        .catch((e) => console.log("catched ", e));
      axios
        .get("https://api.spotify.com/v1/browse/new-releases?limit=5", {
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        })
        .then((e) => {
          setSongs(e.data.albums.items);
        })
        .catch((e) => console.log(e));
      axios
        .get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        })
        .then((e) => {
          const getUniqueListBy = (arr: RecentlyProp[]) => {
            return Array.from(
              new Map(arr.map((item) => [item.track.id, item])).values()
            );
          };
          setRecentlyPlayed(getUniqueListBy(e.data.items));
        })
        .catch((e) => console.log(e));
      axios
        .get(
          "https://api.spotify.com/v1/users/spotify/playlists?limit=10&offset=0",
          {
            headers: {
              Authorization:
                "Bearer " + (session as sessionProps)?.access_token,
            },
          }
        )
        .then((e) => {
          setSpotifyPlaylists(e.data.items);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bgMain rounded-lg"></div>
      <section className="MusicContainer font-bold ">
        <section className="">
          {recentlyPlayed.length && (
            <>
              <div className="flex relative justify-between items-center w-full z-[1] h-[30px]">
                <p className="text-[22px] pl-0">Recently played</p>
              </div>
              <div className="musicSection">
                {recentlyPlayed?.map((e: RecentlyProp, index) => (
                  <MusicCard
                    key={index}
                    imgProp={e.track.album.images[0].url}
                    nameProp={e.track.name}
                    ArtistProp={e.track.artists[0].name}
                    ArtistId={e.track.artists[0].id}
                  />
                ))}
              </div>
            </>
          )}
          <BrowseAllComponent title="Spotify Playlists" href="/" />
          <div className="musicSection">
            {spotifyPlaylists?.map((e: albumProp, index) => (
              <Link href={`/playlist/${e.id}`} key={index}>
                <MusicCard
                  imgProp={e.images[0].url}
                  nameProp={e.name}
                  descriptionProp={e.description}
                />
              </Link>
            ))}
          </div>
          {playlists.length ? (
            <>
              <BrowseAllComponent title="Popular Playlists" href="/" />

              <div className="musicSection">
                {playlists?.map((e: albumProp, index) => (
                  <Link href={`/playlist/${e.id}`} key={index}>
                    <MusicCard
                      key={index}
                      imgProp={e.images[0].url}
                      nameProp={e.name}
                      descriptionProp={e.description}
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <BrowseAllComponent title="Spotify Playlists" href="/" />
              <div className="musicSection">
                {cardsData.map((e, index) => (
                  <MusicCard
                    key={index}
                    imgProp={e.img}
                    nameProp={e.title}
                    descriptionProp={e.description}
                  />
                ))}
              </div>
            </>
          )}

          {songs.length > 2 && (
            <>
              <BrowseAllComponent title=" New albums Releases" href="/" />
              <div className="musicSection">
                {songs.map((e: albumProp, index) => (
                  <Link href={`/album/${e.id}`} key={index}>
                    <MusicCard
                      imgProp={e.images[0].url}
                      nameProp={e.name}
                      ArtistProp={e.artists[0].name}
                      ArtistId={e.artists[0].id}
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default MusicSection;
