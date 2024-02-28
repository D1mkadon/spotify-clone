import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify",
  "user-read-recently-played",
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
  console.log("refresh token log", token.refresh_token);

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
  })
    .then((e) => e.json())
    .then((data) => {
      console.log("answer from server on refresh token", data);
      console.log("b4 answer from server token", token);

      return {
        ...token,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: Date.now() / 1000 + (data.expires_in ?? 3600),
      };
    });
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          expires_in: account?.expires_at ?? 0,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() / 1000 + 60 > token.expires_in) {
        console.log(
          Date.now() / 1000,
          token.expires_in,
          Date.now() / 1000 + 60 > token.expires_in
        );
        console.log("needs to refresh token - ", token);

        return await refreshAccessToken(token);
      }
      return token;
    },
    async session({ session, user, token, account }) {
      return {
        ...session,
        expires_at: token.expires_in,
        id: token.id,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
