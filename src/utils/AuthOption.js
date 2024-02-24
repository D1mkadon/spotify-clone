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
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
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
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
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
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("jwt token", token);

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
      if (Date.now() < token.expires_at) {
        return token;
      }
      return refreshAccessToken(token);
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
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
