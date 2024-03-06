import React, { useEffect, useState } from "react";
import LeftArrow from "../../data/Icons/leftArrow";
import RightArrow from "../../data/Icons/rightArrow";
import Login from "@/app/data/Login";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
interface isVisibleProp {
  isScrolled: Boolean;
}
const Header = ({ isScrolled }: isVisibleProp) => {
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isRightActive, setIsRightActive] = useState(true);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (path === "/") {
      setIsRightActive(false);
      return setIsLeftActive(true);
    }
    setIsLeftActive(false);
    setIsRightActive(false);
  }, [path]);

  const handleLeftClick = () => {
    console.log("path", path);
    if (!isLeftActive) {
      router.back();
    }
  };
  const handleRightClick = () => {
    if (!isRightActive) {
      router.forward();
    }
  };
  return (
    <header
      className={`box-border min-h-16 sticky left-0 top-0 flex w-full items-center gap-2 justify-between py-4 px-6 z-[2] transition-[background-color] ease-in-out duration-300 ${
        isScrolled ? "bg-[#121212]" : "bg-transparent"
      }  `}
    >
      <div className="flex gap-2">
        <button
          disabled={isLeftActive}
          onClick={handleLeftClick}
          className={`bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full  ${
            !isLeftActive ? "opacity-[1]" : "opacity-[0.6]"
          }`}
        >
          <LeftArrow className={"text-[#fff]"} />
        </button>
        <button
          onClick={handleRightClick}
          disabled={isRightActive}
          className={`bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full opacity-[0.6] ${
            !isLeftActive ? "opacity-[1]" : "opacity-[0.6]"
          }`}
        >
          <RightArrow className={"text-[#fff]"} />
        </button>
        {path === "/search" && (
          <div className="relative flex items-center justify-start">
            <label className="absolute left-2" htmlFor="search">
              <Image src={"/search.svg"} alt="" width={16} height={16} />
            </label>
            <input
              id="search"
              type="text"
              placeholder="What do you want to play"
              className="bg-white/10  pl-7 pr-2 py-2 rounded-full outline-0 border-2"
            ></input>
          </div>
        )}
      </div>

      <div className="flex items-center font-bold">
        <Login />
      </div>
    </header>
  );
};

export default Header;
