import useAuth from "../data/useAuth";
const Profile = ({ code }) => {
  const accessToken = useAuth(code);
  return <div>Profile</div>;
};

export default Profile;
