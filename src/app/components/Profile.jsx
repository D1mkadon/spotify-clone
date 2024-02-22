import { useEffect } from "react";
import useAuth from "../data/useAuth";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});
const Profile = ({ code }) => {
  const accessToken = useAuth(code);
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken);
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((e) => console.log("user info call", e))
      .catch((e) => console.log("user info error", e));
  }, []);
  return <div>profile name</div>;
};

export default Profile;
