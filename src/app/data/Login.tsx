import { useSession, signIn, signOut } from "next-auth/react";
import Profile from "../components/Profile";
interface logProps {
  code: string | null;
}
const Login = ({ code }: logProps) => {
  // const { data: session } = useSession();
  // console.log(session?.user?.accessToken);
  return (
    <div className="flex">
      {code ? (
        <Profile code={code} />
      ) : (
        <>
          <button className="p-2 pr-8">Sign up</button>
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
      )}
    </div>
  );
};

export default Login;
