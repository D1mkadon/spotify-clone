import React from "react";
import AlbumSwitcherButton from "./albumSwitcherButton";
interface switcherProp {
  found: boolean;
  handleClick: (value: string) => void;
  handleClickPopular: (value: string) => void;
}
const AlbumSwitcher = ({
  handleClick,
  found,
  handleClickPopular,
}: switcherProp) => {
  return (
    <div className="flex justify-start items-center text-sm mb-4">
      <AlbumSwitcherButton
        handleClick={handleClickPopular}
        text="Popular Releases"
        hrefText="single,album"
      />
      <AlbumSwitcherButton
        handleClick={handleClick}
        text="Albums"
        hrefText="album"
      />
      <AlbumSwitcherButton
        handleClick={handleClick}
        text="Singles and EPs"
        hrefText="single"
      />
      {found && (
        <AlbumSwitcherButton
          handleClick={handleClick}
          text="Compilation"
          hrefText="compilation"
        />
      )}
    </div>
  );
};

export default AlbumSwitcher;
