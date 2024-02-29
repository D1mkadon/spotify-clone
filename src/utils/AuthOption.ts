import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextAuthOptions } from "next-auth";
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

async function refreshAccessToken(token: any) {
  console.log("refresh token log", token.refresh_token);

  await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
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
        expires_in: Date.now() / 1000 + data.expires_in,
      };
    });
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user, account }: { token: any; user: any; account: any }) {
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          expires_in: account?.expires_at ?? 0,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() / 1000 + 60 > token.expires_in) {
        console.log("needs to refresh token - ", token);
        return refreshAccessToken(token);
      }
      return token;
    },
    session({ session, token }) {
      session.expires_at = token.expires_in,
      session.id = token.id,
      session.access_token = token.access_token,
      session.refresh_token = token.refresh_token;
      console.log("session", session);
      return session;
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
