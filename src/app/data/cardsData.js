export const cardsData = [
  {
    title: "lofi beats",
    description: "chill beats, lofi vibes, new tracks every week...",
    img: "https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037",
  },
  {
    title: "Today`s Top Hits",
    description: "Beyoncé is on top of the Hottest 50!",
    img: "https://i.scdn.co/image/ab67706f000000024fea192e4badc04a095e1152",
  },
  {
    title: "Chillout Lounge",
    description: "Just lean back and enjoy relaxed beats.",
    img: "https://i.scdn.co/image/ab67706f00000002dec17246891b5b4eb97bdb0d",
  },
  {
    title: "All out 2020s",
    description: "The biggest songs of the 2020s.",
    img: "https://i.scdn.co/image/ab67706f00000002d771dc645afe9b87978b1d3e",
  },
  {
    title: "Jazz in the Background",
    description: "Soft instrumental Jazz for all your activities.",
    img: "https://i.scdn.co/image/ab67706f00000002bdeb1c317ac2dd10f2397e4c",
  },
  {
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    img: "https://i.scdn.co/image/ab67706f00000002f4d83a6cb7f51f6d9f6717de",
  },
  {
    title: "Peaceful Piano",
    description: "Peaceful piano to help you slow down, breathe, and relax. ",
    img: "https://i.scdn.co/image/ab67706f00000002d073e656e546e43bc387ad79",
  },
  {
    title: "Rock Classics",
    description:
      "Rock legends & epic songs that continue to inspire generations. Cover: Foo Fighters",
    img: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e",
  },
  {
    title: "Stress Relief",
    description:
      "Calm your mind from anxiety with gentle piano and ambient music.",
    img: "https://i.scdn.co/image/ab67706f0000000231ca8abcbff3f5a3eb1fd339",
  },
];

export const getColorByGenre = (genre) => {
  switch (genre) {
    case "pop":
    case "idm":
    case "indian":
    case "indie":
    case "indie-pop":
    case "industrial":
    case "iranian":
    case "j-dance":
    case "j-idol":
    case "j-pop":
    case "world-music":
    case "j-rock":
      return "#506880";
    case "soundtracks":
    case "spanish":
    case "study":
    case "summer":
    case "swedish":
    case "synth-pop":
    case "tango":
    case "techno":
    case "trance":
    case "trip-hop":
    case "turkish":
    case "work-out":
      return "#6366f1";
    case "acoustic":
    case "afrobeat":
    case "alt-rock":
    case "alternative":
    case "ambient":
    case "atl hip hop":
    case "anime":
    case "black-metal":
    case "bluegrass":
    case "blues":
    case "bossanova":
    case "brazil":
    case "breakbeat":
    case "british":
      return "#3b82f6";
    case "rockabilly":
    case "romance":
    case "sad":
    case "salsa":
    case "samba":
    case "sertanejo":
    case "show-tunes":
    case "singer-songwriter":
    case "ska":
    case "sleep":
    case "songwriter":
    case "soul":
      return "#22c55e";
    case "piano":
    case "post-dubstep":
    case "power-pop":
    case "progressive-house":
    case "psych-rock":
    case "punk":
    case "punk-rock":
    case "r-n-b":
    case "rainy-day":
    case "reggae":
    case "reggaeton":
    case "road-trip":
    case "rock":
    case "rock-n-roll":
      return "#ef4444";
    case "metal":
    case "metal-misc":
    case "metalcore":
    case "minimal-techno":
    case "movies":
    case "mpb":
    case "new-age":
    case "new-release":
    case "opera":
    case "pagode":
    case "party":
    case "philippines-opm":
    case "pop-film":
      return "#eab308";
    case "hardstyle":
    case "heavy-metal":
    case "hip-hop":
    case "holidays":
    case "honky-tonk":
    case "house":
    case "jazz":
    case "k-pop":
    case "kids":
    case "latin":
    case "latino":
    case "malay":
    case "mandopop":
      return "#ec4899";
    case "funk":
    case "garage":
    case "german":
    case "gospel":
    case "goth":
    case "grindcore":
    case "groove":
    case "grunge":
    case "guitar":
    case "happy":
    case "hard-rock":
    case "afroswing":
    case "grime":
    case "london rap":
    case "uk hip hop":
    case "hip hop":
    case "hardcore":
      return "#a855f7";
    case "cantopop":
    case "chicago-house":
    case "children":
    case "chill":
    case "classical":
    case "club":
    case "comedy":
    case "country":
    case "dance":
    case "dancehall":
    case "death-metal":
    case "deep-house":
    case "detroit-techno":
    case "disco":
    case "disney":
    case "drum-and-bass":
    case "dub":
    case "dubstep":
    case "edm":
    case "electro":
    case "electronic":
    case "emo":
    case "folk":
    case "forro":
    case "french":
      return "#d6d3d1";
    default:
      return "#166534";
  }
};
