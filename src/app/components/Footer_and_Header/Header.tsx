import React from "react";
import LeftArrow from "../../data/Icons/leftArrow";
import RightArrow from "../../data/Icons/rightArrow";
import Login from "@/app/data/Login";
interface isVisibleProp {
  isScrolled: Boolean;
}
const Header = ({ isScrolled }: isVisibleProp) => {
  return (
    <header
      className={`box-border h-16 sticky top-0 flex w-full items-center gap-2 justify-between py-4 px-6 z-[2] transition-[background-color] ease-in-out duration-300 ${
        isScrolled ? "bg-[#121212]" : "bg-transparent"
      }  `}
    >
      <div className="flex gap-2">
        <button
          disabled
          className="bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full opacity-[0.6]"
        >
          <LeftArrow className={"text-[#fff]"} />
        </button>
        <button
          disabled
          className="bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full opacity-[0.6]"
        >
          <RightArrow className={"text-[#fff]"} />
        </button>
      </div>

      <div className="flex items-center font-bold">
        <Login />
      </div>
    </header>
  );
};

export default Header;
