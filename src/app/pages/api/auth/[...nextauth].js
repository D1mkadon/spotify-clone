import NextAuth from "next-auth";

import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_CLIENT_SECRET = "8ee886316a3c45c5b43a58ba10fe681a";
const JWT_SECRET = "70c490dc529d06e16a176eebd03a9073";
const CLIENT_ID = "661c1a86ac4644139d3e940a5dab6048";
const Redirect_URI = "http://localhost:3000";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${Redirect_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
const scopes = [
  "streaming%20",
  "user-read-email%20",
  "user-read-private%20",
  "playlist-read-private%20",
  "playlist-read-collaborative%20",
  "user-read-currently-playing%20",
  "user-read-playback-state%20",
  "user-modify-playback-state%20",
  "user-library-read%20",
  "user-library-modify%20",
].join(",");

const params = {
  client_id: CLIENT_ID,
  response_type: "code",
  redirect_uri: "http://localhost:3000",
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
  // refresh access token
  console.log("refresh token log", token.accessToken);
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", `${Redirect_URI}`);
  params.append("code", `${token.accessToken}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    body: params,
  });
  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_at * 1000,
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: AUTH_URL,
    }),
    // ...add more providers here
  ],
  secret: JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      // access token has not expired
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }
      // access token expired
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
