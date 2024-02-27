import {
  albumProp,
  artistProp,
  sessionProps,
  topTrackProp,
} from "@/types/types";
import axios from "axios";

import { getSession } from "next-auth/react";

import { Dispatch, SetStateAction } from "react";

export const fetchArtist = async (
  id: string,
  setArtist: (value: artistProp) => void
) => {
  const session = await getSession();
  axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: "Bearer " + (session as sessionProps).access_token,
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
  setTopTracks: Dispatch<SetStateAction<topTrackProp[]>>
) => {
  const session = await getSession();
  await axios
    .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
      headers: {
        Authorization: "Bearer " + (session as sessionProps).access_token,
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
        Authorization: "Bearer " + (session as sessionProps).access_token,
      },
    })
    .then((e) => {
      setRelatedArtists(e.data.artists);
      // console.log("related artists", e.data);
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
          Authorization: "Bearer " + (session as sessionProps).access_token,
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
        Authorization: "Bearer " + (session as sessionProps).access_token,
      },
    }
  )
    .then((e) => e.json())
    .then((data1) => {
      console.log(data1);
      data1.items.map((e: albumProp) => {
        ids = `${ids}` + `${e.id},`;
      });
      ids = ids.replace(/,(?=\s*$)/g, "");
      return fetch(`https://api.spotify.com/v1/albums?ids=${ids}&market=ES`, {
        headers: {
          Authorization: "Bearer " + (session as sessionProps).access_token,
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

