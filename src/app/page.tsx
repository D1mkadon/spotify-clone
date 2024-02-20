import React from "react";

import LeftBlock from "./components/LeftBlock";
import BottomBlock from "./components/BottomBlock";
import Image from "next/image";
import { cardsData } from "./data/cardsData";
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
          <section>
            <section className="px-6">
              <div className="flex justify-between ">
                <a href="/">Spotify Playlist</a>
                <a>show all</a>
              </div>
              <div className="musicSection ">
                {cardsData.map((e, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg relative bg-[#181818]"
                  >
                    <div className="pb-[100%] relative mb-4">
                      <Image
                        src={e.img}
                        alt="/"
                        fill
                        className="w-full  h-full top-0 left-0 object-cover object-center"
                      />
                    </div>
                    <div className="max-w-full min-h-[62px]">
                      <p className="inline-block max-w-full pb-1 text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap h-[26px]">
                        {e.title}
                      </p>
                      <span className="text-[#a7a7a7] text-[0.875rem]">
                        {e.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <div>Sleep</div>
            </section>
          </section>
          <section>footer</section>
        </main>
      </div>
      <BottomBlock />
    </div>
  );
};

export default Home;
