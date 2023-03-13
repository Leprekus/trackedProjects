export type Image = {
  url: string;
  heigh: number;
  width: number;
};

export type Artists = {
  
    external_url: string;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  
}
export type UserPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: object;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: object[];
  primary_color?: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: object;
  type: string;
  uri: string;
};

export type Tracks = {
  album: {
    artists: Artists[];
    images: Image[];
    name: string
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};


}
