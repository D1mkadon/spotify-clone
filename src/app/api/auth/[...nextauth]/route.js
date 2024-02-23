import NextAuth from "next-auth";

import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_CLIENT_SECRET = "8ee886316a3c45c5b43a58ba10fe681a";
const JWT_SECRET = "70c490dc529d06e16a176eebd03a9073";
const CLIENT_ID = "661c1a86ac4644139d3e940a5dab6048";
const REDIRECT_URI = "http://localhost:3000";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
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
].join(",");

const params = {
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
  params.append("redirect_uri", `${REDIRECT_URI}`);
  params.append("code", `${token.accessToken}`);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    form: {
      grant_type: "authorization_code",
      // code: code,
      redirect_uri: REDIRECT_URI,
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    json: true,
  });
  const data = await response.json();
  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      // authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log("jwt token", token);

      // pass expires_at access_token refresh_token to token
      if (user && account) {
        return {
          ...token,
          id: user.id,
          expires_at: account.expires_at * 1000,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
        };
      }
      return token;
    },
    async session({ session, user, token, account }) {
      // console.log("session callback", { session, token, user });
      return {
        ...session,
        expires_at: token.expires_at,
        id: token.id,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };

      // session.account.access_token = account.access_token;
      // session.account.expires_at = account.expires_at;
      // session.account.refresh_token = account.refresh_token;
    },
    // async jwt({ token, account, user }) {
    //   console.log("jwt token", token);
    //   console.log("jwt account", account);
    //   console.log("jwt user", user);
    //   if (account && user) {
    //     return {
    //       ...token,
    //       accessToken: account.access_token,
    //       refreshToken: account.refresh_token,
    //       username: account.providerAccountId,
    //       accessTokenExpires: account.expires_at * 1000,
    //     };
    //   }

    //   if (Date.now() < token.accessTokenExpires) {
    //     console.log("token is valid");
    //     return token;
    //   }

    //   console.log("token is expired, refreshing");
    //   return await refreshAccessToken(token);
    // },
    // async session({ session, token }) {
    //   session.user.accessToken = token.accessToken;
    //   session.user.refreshToken = token.refreshToken;
    //   session.user.username = token.username;

    //   return session;
    // },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
