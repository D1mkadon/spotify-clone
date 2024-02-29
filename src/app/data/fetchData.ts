import { albumProp, artistProp, sessionProps, TrackProp } from "@/types/types";
import axios from "axios";

import { getSession } from "next-auth/react";

import { Dispatch, SetStateAction } from "react";
export default function millisToTime(millis: number): string {
  const hours: number = Math.floor(millis / 3600000);
  const remainingMillisWithoutHours: number = millis % 3600000;
  const minutes: number = Math.floor(remainingMillisWithoutHours / 60000);
  const seconds: string = ((remainingMillisWithoutHours % 60000) / 1000)
    .toFixed(0)
    .padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
export function millisToHoursAndMinutes(millis: number): string {
  const hours: number = Math.floor(millis / 3600000);
  const remainingMillisWithoutHours: number = millis % 3600000;
  const minutes: number = Math.floor(remainingMillisWithoutHours / 60000);

  let result: string = "";
  if (hours > 0) {
    result += `${hours} hr `;
  }
  if (minutes > 0 || hours === 0) {
    result += `${minutes} min`;
  }

  return result.trim();
}
export const fetchArtist = async (
  id: string,
  setArtist: (value: artistProp) => void
) => {
  const session = await getSession();
  axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setArtist(e.data);
      // console.log("artist", e.data);
    })
    .catch((e) => console.log(e));
};
export const fetchTopArtistTracks = async (
  id: string,
  setTopTracks: Dispatch<SetStateAction<TrackProp[]>>
) => {
  const session = await getSession();
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      // console.log("top tracks", e.data),
      setTopTracks(e.data.tracks);
    });
};
export const fetchRelatedArtists = async (
  id: string,
  setRelatedArtists: Dispatch<SetStateAction<artistProp[]>>
) => {
  const session = await getSession();
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setRelatedArtists(e.data.artists);
    })
    .catch((e) => console.log(e));
};
export const fetchArtistAlbums = async (
  id: string,
  setAlbums: Dispatch<SetStateAction<albumProp[]>>,
  includeGroups: string,
  setFound?: (value: boolean) => void | undefined
) => {
  const session = await getSession();
  await axios
    .get(
      `https://api.spotify.com/v1/artists/${id}/albums?market=ES&offset=0&include_groups=${includeGroups}`,
      {
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
      }
    )
    .then((e) => {
      setAlbums(e.data.items);

      if (
        setFound !== undefined &&
        !!e.data.items.find(
          (e: albumProp) =>
            e.album_type === "compilation" && e.album_group === "compilation"
        )
      ) {
        setFound(true);
      }
    })
    .catch((e) => console.log(e));
};
//all

export const fetchArtistAllAlbums = async (
  id: string,
  setData: any,
  includeGroups: string
) => {
  const session = await getSession();
  if (session === null) return;
  let ids = "";
  fetch(
    `https://api.spotify.com/v1/artists/${id}/albums?market=ES&offset=0&include_groups=${includeGroups}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    }
  )
    .then((e) => e.json())
    .then((data1) => {
      data1.items.map((e: albumProp) => {
        ids = `${ids}` + `${e.id},`;
      });
      ids = ids.replace(/,(?=\s*$)/g, "");
      return fetch(`https://api.spotify.com/v1/albums?ids=${ids}&market=ES`, {
        headers: {
          Authorization: "Bearer " + session?.access_token,
        },
        method: "GET",
        cache: "no-cache",
      });
    })
    .then((op) => op.json())
    .then((data) => {
      setData(() => data.albums);
    })
    .catch((e) => console.log(e));
};
export const fetchAlbumById = async (
  id: string,
  setAlbumById: Dispatch<SetStateAction<albumProp>>,
  setAlbumDuration: any,
  setMoreAlbums: Dispatch<SetStateAction<Array<albumProp>>>
) => {
  const session = await getSession();
  await fetch(`https://api.spotify.com/v1/albums/${id}?market=ES`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + session?.access_token,
    },
  })
    .then((e) => e.json())
    .then((data) => {
      setAlbumById(data);
      data.tracks.items.map((e: any) => {
        setAlbumDuration((prevState: number) => prevState + e.duration_ms);
      });
      fetch(
        `https://api.spotify.com/v1/artists/${data.artists[0].id}/albums?market=ES&offset=0&include_groups=single,album`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session?.access_token,
          },
        }
      )
        .then((d) => d.json())
        .then((data2) => {
          setMoreAlbums(data2.items);
        });
    })

    .catch((e) => console.log(e));
};
