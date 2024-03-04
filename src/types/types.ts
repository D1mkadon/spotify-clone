export interface sessionProps {
  access_token: string;
  expires: string;
  expires_at: number;
  id: string;
  refresh_token: string;
  user: {
    email: string;
    name: string;
  };
}
export type artistProp = {
  name: string;
  images: { url: string }[];
  genres: [string];
  type: string;
  id: string;
  followers: {
    total: number;
  };
};
export interface albumProp {
  name: string;
  images: { url: string }[];
  type: string;
  release_date: string;
  album_type: string;
  album_group: string;
  description?: string;
  copyrights?: { text: string; type: string }[];
  total_tracks: number;
  id: string;
  tracks: {
    items: TrackProp[];
  };
  artists: {
    id: string;
    name: string;
  }[];
}
export type TrackProp = {
  name: string;
  duration_ms: number;
  track_number: number;
  id: string;
  album: { images: { url: string }[] };
  artists: { id: string; name: string }[];
  uri: string;
};
export interface itemProp {
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
}

export interface categoryDataProps {
  message?: "Hip-Hop";
  playlists?: {};
}
export interface playbackProp {
  actions: { dissallows: { pausing: boolean } };
  progress_ms: number;
  item: TrackProp;
}
export interface playlistProp {
  images: { url: string }[];
  tracks: {
    items: playlistTrackProp[];
  };
  name: string;
  id: string;
  primary_color: string;
  description: string;
  followers: { total: number };
  owner: { display_name: string };
}
export interface playlistTrackProp {
  added_at: string;
  added_by: { id: string; user: string };
  track: TrackProp;
}
