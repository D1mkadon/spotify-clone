import { useEffect, useState } from "react";
import useAuth from "../data/useAuth";
import axios from "axios";

const Profile = ({ code }) => {
  const accessToken = useAuth(code);
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken);
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((e) => {
        console.log("user info call", e.data), setProfile(e.data);
      })
      .catch((e) => console.log("user info error", e));
  }, [accessToken]);
  return <div>{profile ? <p>{profile.display_name}</p> : null}</div>;
};

export default Profile;
