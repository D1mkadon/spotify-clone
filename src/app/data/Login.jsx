"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../components/Profile/Profile";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  console.log("use session hook", session);

  useEffect(() => {
    setLoading(true);
    async function f() {
      if (session && session?.user?.name) {
        setLoading(false);
      }
    }
    f();
  }, [session]);
  if (loading) {
    return <p>loading...</p>;
  }
  if (session && session?.user?.name) {
    return <Profile user={session.user} />;
  }
  return (
    <div className="flex">
      <>
        <button
          className="flex box-border hover:scale-[1.05]"
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          <span className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base">
            Log in
          </span>
        </button>
      </>
    </div>
  );
};

export default Login;
