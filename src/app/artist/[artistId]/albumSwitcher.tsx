import React from "react";
import AlbumSwitcherButton from "./albumSwitcherButton";
interface switcherProp {
  found: boolean;
  handleClick: (value: string) => void;
}
const AlbumSwitcher = ({ handleClick, found }: switcherProp) => {
  return (
    <div className="flex justify-start items-center text-sm mb-4">
      <AlbumSwitcherButton
        handleClick={handleClick}
        text="Popular Releases"
        hrefText="appears_on"
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
