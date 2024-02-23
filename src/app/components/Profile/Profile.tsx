// export interface dataProps {
//   data: {};
// }
import { useState } from "react";
import { dropDownData } from "./dropDownData";

const Profile = ({ user }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClickButton = () => {
    setIsVisible(!isVisible);
  };
  console.log(user);
  return (
    <div>
      <button></button>
      <button></button>
      <button></button>
      <div className="user-dropdown relative">
        <button
          className="rounded-full bg-black/[0.54] box-border  inline-flex justify-center items-center text-[14px] font-bold w-8 h-8 hover:scale-[1.04]"
          onClick={handleClickButton}
        >
          <span className="bg-[#19e68c] text-black h-6 w-6 rounded-full box-border">
            {user?.name.charAt(0)}
          </span>
        </button>
        <div className="user-hover-dropdown-content text-black">
          <p>{user?.name}</p>
        </div>
        <div
          className={`user-dropdown-content  ${
            isVisible
              ? "opacity-1 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {dropDownData.map((e, index) => (
            <a
              key={index}
              className="p-3 pr-2 h-10 text-white box-border cursor-pointer flex justify-between items-center gap-3 flex-[1] min-w-[188px] hover:bg-[hsla(0,0%,100%,.1)] "
            >
              <span>{e.title}</span>
              {e.icon}
            </a>
          ))}
          <button className="p-3 pr-2  text-white box-border hover:bg-[hsla(0,0%,100%,.1)] cursor-pointer flex justify-between gap-3 border-t border-t-[hsla(0,0%,100%,.1)]">
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
