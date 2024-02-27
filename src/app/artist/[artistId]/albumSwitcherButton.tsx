import React from "react";
interface switcherProp {
  handleClick: (value: string) => void;
  text: string;
  hrefText: string;
}
const AlbumSwitcherButton = ({ handleClick, text, hrefText }: switcherProp) => {
  return (
    <button
      className={`bg-[rgba(0,0,0,0.07  )] mr-2 mb-2 group `}
      onClick={() => handleClick(hrefText)}
    >
      <span className="py-2 px-3 transition-all ease-in-out duration-200 bg-[hsla(0,0%,100%,.07)] rounded-full group-focus:bg-white group-focus:text-black group-hover:bg-[hsla(0,0%,100%,.2)]">
        {text}
      </span>
    </button>
  );
};

export default AlbumSwitcherButton;