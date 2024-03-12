import React, { useEffect, useState } from "react";
import LeftArrow from "../../data/Icons/leftArrow";
import RightArrow from "../../data/Icons/rightArrow";
import Login from "@/app/data/Login";
import { useParams, usePathname, useRouter } from "next/navigation";

import SearchComponent from "../SearchComponent";

const Header = ({ isScrolled }: { isScrolled: Boolean }) => {
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isRightActive, setIsRightActive] = useState(true);

  const path = usePathname();
  const router = useRouter();
  const searchParams = useParams();
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
        {(path === "/search" ||
          path === `/search/${searchParams.searchResult}`) && (
          <SearchComponent />
        )}
      </div>

      <div className="flex items-center font-bold">
        <Login />
      </div>
    </header>
  );
};

export default Header;
