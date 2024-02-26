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
  // const refreshToken = localStorage.getItem("refresh_token");
  console.log("refresh token log", token.refresh_token);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: {
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
      redirect_uri: process.env.REDIRECT_URI,
    },
  });
  const data = await response.json();
  console.log("dataResponse", data);
  // localStorage.setItem("refresh_token", response.refreshToken);
  return {
    ...token,
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? token.refreshToken,
    expires_at: Date.now() + data.expires_in * 1000,
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
      if (user) {
        return {
          ...token,
          id: user.id,
          expires_at: (account?.expires_at ?? 0) * 1000,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
        };
      }
      if (Date.now() - 6000 < token.expires_at) {
        return token;
      }
      console.log("Token is invalid");
      return await refreshAccessToken(token);
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
