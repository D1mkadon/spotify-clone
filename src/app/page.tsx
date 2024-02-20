import React from "react";

import LeftBlock from "./components/LeftBlock";
import BottomBlock from "./components/BottomBlock";
const Home = () => {
  return (
    <div className="block">
      <LeftBlock />

      <div className=" rightSideBlock flex flex-col relative">
        <header className="h-16 flex absolute w-full items-center gap-2 justify-between p-4 z-[1]">
          <div className="flex gap-2">
            <button> leftArrow </button>
            <button> rightArrow</button>
          </div>
          <div>
            <div>
              <button>Sign up</button>
              <button>Log in</button>
            </div>
          </div>
        </header>
        <div className="bgMain"></div>
        <div className="h-16"></div>
        <main className="z-[1]">
          <div>
            <div className="px-6">
              <div className="flex justify-between ">
                <a href="/">Spotify Playlist</a>
                <a>show all</a>
              </div>
            </div>
            <div>Sleep</div>
          </div>
          <div></div>
        </main>
      </div>
      <BottomBlock />
    </div>
  );
};

export default Home;
