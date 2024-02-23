"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../components/Profile";

const Login = () => {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { data: session } = useSession();
  console.log("use session hook", session);
  useEffect(() => {
    if (session && session.user.accessToken) {
      setCode(session.user.accessToken);
    }
  }, [session]);

  return (
    <div className="flex">
      <>
        {/* <button className="p-2 pr-8">Sign up</button> */}
        <div className="w-full">
          <p> name: {session?.expires_at} </p>
        </div>

        <button
          className="flex box-border hover:scale-[1.05]"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          <span className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base">
            Log in
          </span>
        </button>
        <button
          className="flex box-border hover:scale-[1.05]"
          onClick={() => signOut("spotify", { callbackUrl: "/" })}
        >
          <span className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base">
            signOut
          </span>
        </button>
      </>
    </div>
  );
};

export default Login;
