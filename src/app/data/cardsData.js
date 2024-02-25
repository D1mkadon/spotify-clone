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
    case "pop" ||
      "idm" ||
      "indian" ||
      "indie" ||
      "indie-pop" ||
      "industrial" ||
      "iranian" ||
      "j-dance" ||
      "j-idol" ||
      "j-pop" ||
      "world-music" ||
      "j-rock":
      return "#506880";
    case "soundtracks" ||
      "spanish" ||
      "study" ||
      "summer" ||
      "swedish" ||
      "synth-pop" ||
      "tango" ||
      "techno" ||
      "trance" ||
      "trip-hop" ||
      "turkish" ||
      "work-out":
      return "#6366f1";
    case "acoustic" ||
      "afrobeat" ||
      "alt-rock" ||
      "alternative" ||
      "ambient" ||
      "anime" ||
      "black-metal" ||
      "bluegrass" ||
      "blues" ||
      "bossanova" ||
      "brazil" ||
      "breakbeat" ||
      "british":
      return "#3b82f6";
    case "rockabilly" ||
      "romance" ||
      "sad" ||
      "salsa" ||
      "samba" ||
      "sertanejo" ||
      "show-tunes" ||
      "singer-songwriter" ||
      "ska" ||
      "sleep" ||
      "songwriter" ||
      "soul":
      return "#22c55e";
    case "piano" ||
      "post-dubstep" ||
      "power-pop" ||
      "progressive-house" ||
      "psych-rock" ||
      "punk" ||
      "punk-rock" ||
      "r-n-b" ||
      "rainy-day" ||
      "reggae" ||
      "reggaeton" ||
      "road-trip" ||
      "rock" ||
      "rock-n-roll":
      return "#ef4444";
    case "metal" ||
      "metal-misc" ||
      "metalcore" ||
      "minimal-techno" ||
      "movies" ||
      "mpb" ||
      "new-age" ||
      "new-release" ||
      "opera" ||
      "pagode" ||
      "party" ||
      "philippines-opm" ||
      "pop-film":
      return "#eab308";
    case "hardstyle" ||
      "heavy-metal" ||
      "hip-hop" ||
      "holidays" ||
      "honky-tonk" ||
      "house" ||
      "jazz" ||
      "k-pop" ||
      "kids" ||
      "latin" ||
      "latino" ||
      "malay" ||
      "mandopop":
      return "#ec4899";
    case "funk" ||
      "garage" ||
      "german" ||
      "gospel" ||
      "goth" ||
      "grindcore" ||
      "groove" ||
      "grunge" ||
      "guitar" ||
      "happy" ||
      "hard-rock" ||
      "hardcore":
      return "#a855f7";
    case "cantopop" ||
      "chicago-house" ||
      "children" ||
      "chill" ||
      "classical" ||
      "club" ||
      "comedy" ||
      "country" ||
      "dance" ||
      "dancehall" ||
      "death-metal" ||
      "deep-house" ||
      "detroit-techno" ||
      "disco" ||
      "disney" ||
      "drum-and-bass" ||
      "dub" ||
      "dubstep" ||
      "edm" ||
      "electro" ||
      "electronic" ||
      "emo" ||
      "folk" ||
      "forro" ||
      "french":
      return "#d6d3d1";
    default:
      return "#166534";
  }
};
