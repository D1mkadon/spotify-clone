// export interface dataProps {
//   data: {};
// }
import { ReactNode, useEffect, useRef, useState } from "react";
import { dropDownData } from "./dropDownData";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Profile = ({ user }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const dropDownContent = useRef<HTMLDivElement>(null);

  const handleClickButton = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    let handler = (e: Event) => {
      if (!dropDownContent.current?.contains(e.target as HTMLElement)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, [isVisible]);
  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <button className="hover:scale-[1.04] text-sm">
        <span className="rounded-full h-8 flex items-center justify-center text-black bg-white relative py-1 px-4">
          Explore Premium
        </span>
      </button>
      <Link href={"/download"} className="hover:scale-[1.04] text-sm ">
        <span className="flex items-center bg-[rgba(0,0,0,.54)] rounded-full py-1 pr-4 pl-[33px] relative h-8">
          <Image
            src={"/download.svg"}
            className="absolute left-3"
            alt="spotify Logo"
            width={16}
            height={16}
          />
          <span>Install App</span>
        </span>
      </Link>
      <button className="hover:scale-[1.04] bg-[rgba(0,0,0,.54)] rounded-full h-8 w-8 flex items-center justify-center">
        <Image
          src={"/notification.svg"}
          alt="spotify Logo"
          width={16}
          height={16}
        />
      </button>
      <div className="user-dropdown relative">
        <button
          ref={dropdownRef}
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
          ref={dropDownContent}
          className={`user-dropdown-content
          ${
            isVisible
              ? "opacity-1 ointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
         `}
        >
          {dropDownData.map((e, index) => (
            <a
              key={index}
              className="dropLinks p-3 pr-2 h-10 text-white box-border cursor-pointer flex justify-between items-center gap-3 flex-[1] min-w-[188px] hover:bg-[hsla(0,0%,100%,.1)] "
            >
              <span>{e.title}</span>
              {e.icon}
            </a>
          ))}
          <button
            onClick={() => signOut()}
            className="p-3 pr-2 dropLinks text-white box-border hover:bg-[hsla(0,0%,100%,.1)] cursor-pointer flex justify-between gap-3 border-t border-t-[hsla(0,0%,100%,.1)]"
          >
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
