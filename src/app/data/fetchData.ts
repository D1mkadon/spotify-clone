import state from "@/store";
import {
  albumProp,
  artistProp,
  playlistProp,
  sessionProps,
  TrackProp,
} from "@/types/types";
import axios from "axios";

import { getSession } from "next-auth/react";

import { Dispatch, SetStateAction } from "react";
// functions for time
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
// api calls for artists and albums
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
// playback fetches

export const fetchPlaybackState = async (setState: any) => {
  const session = await getSession();
  axios
    .get("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setState(e.data);
    });
};
export const fetchSongInfo = async (
  id: string,
  setState: (value: TrackProp) => void | undefined
) => {
  const session = await getSession();
  axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setState(e.data);
    });
};
export const fetchCurrentlyPlay = async (setProgress: any) => {
  const session = await getSession();
  axios
    .get(`https://api.spotify.com/v1/me/player/currently-playing?market=ES`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      if (e.status == 204) {
        console.log("204 response from currently playing");
        return;
      }
      state.trackID = e.data.item.id;
      setProgress(e.data.progress_ms);
      if (e.data.is_playing) {
        state.isPlaying = true;
      }
    });
};
export const fetchPlaylistById = async (
  playlist_id: string,
  setPlaylist: (value: playlistProp) => void | undefined
) => {
  const session = await getSession();
  axios
    .get(`https://api.spotify.com/v1/playlists/${playlist_id}?market=ES`, {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setPlaylist(e.data);
    });
};
export const fetchFollowedArtists = async (
  setFollowing: Dispatch<SetStateAction<artistProp[]>>
) => {
  const session = await getSession();
  axios
    .get("https://api.spotify.com/v1/me/following?type=artist&limit=20", {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      if (e.status === 200) {
        setFollowing(e.data.artists.items);
      }
    });
};
export const fetchFollowedPlaylist = async (
  setPlaylists: Dispatch<SetStateAction<playlistProp[]>>
) => {
  const session = await getSession();
  axios
    .get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + session?.access_token,
      },
    })
    .then((e) => {
      setPlaylists(e.data.items);
    });
};
