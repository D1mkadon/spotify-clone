const CLIENT_ID = "661c1a86ac4644139d3e940a5dab6048";
const Redirect_URI = "http://localhost:3000";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${Redirect_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <a
      className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base"
      href={AUTH_URL}
    >
      Log in
    </a>
  );
};

export default Login;
