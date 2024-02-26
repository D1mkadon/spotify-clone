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
};
export interface albumProp {
  name: string;
  images: { url: string }[];
  type: string;
  release_date: string;
  album_type: string;
  album_group: string;
  description?: string;
}
export type topTrackProp = {
  name: string;
  duration_ms: number;
  album: { images: { url: string }[] };
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
