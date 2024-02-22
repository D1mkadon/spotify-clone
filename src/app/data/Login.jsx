import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../components/Profile";

const Login = () => {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    setCode(new URLSearchParams(window.location.search).get("code"));
    window.history.pushState({}, null, "/");
  }, []);

  useEffect(() => {
    if (!code) return;
    console.log("code", code);
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: `Authorization: Bearer ${code}`,
      })
      .then((e) => {
        setLoading(true), setData(e.data);
      });
  }, [code]);

  if (code) {
    return (
      <>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <Profile data={data}></Profile>
            <br />
            <button onClick={() => signOut()}>sign out</button>
          </>
        )}
      </>
    );
  }
  return (
    <div className="flex">
      <>
        {/* <button className="p-2 pr-8">Sign up</button> */}
        <button
          className="flex box-border hover:scale-[1.05]"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          <span
            className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base"
            // href={AUTH_URL}
          >
            Log in
          </span>
        </button>
      </>
    </div>
  );
};

export default Login;
