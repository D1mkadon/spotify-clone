import React from "react";

import LeftBlock from "./components/LeftBlock";
import BottomBlock from "./components/BottomBlock";
import Image from "next/image";
import { cardsData } from "./data/cardsData";
import { RightFooterLinks } from "./data/RightFooterLinks";
const Home = () => {
  return (
    <div className="block">
      <LeftBlock />

      <div className=" rightSideBlock flex flex-col relative ">
        <header className="h-16 flex absolute w-full items-center gap-2 justify-between p-4 z-[1] bg-[rgba(0,0,0,.5);]">
          <div className="flex gap-2">
            <button> leftArrow </button>
            <button> rightArrow</button>
          </div>
          <div>
            <div className="flex">
              <button className="p-2 pr-8">Sign up</button>
              <button className="flex box-border hover:scale-[1.05]">
                <span className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base">
                  Log in
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="bgMain"></div>
        <div className="h-16"></div>
        <main className="z-[1] pt-2">
          <section className="MusicContainer">
            <div className="flex justify-between items-center w-full px-4 h-[30px]">
              <a href="/" className="hover:underline font-extrabold">
                Spotify Playlist
              </a>
              <a href="/" className="hover:underline text-[#B3b3b3]">
                show all
              </a>
            </div>
            <section className="">
              <div className="musicSection">
                {cardsData.map((e, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg relative bg-[#181818] cursor-pointer hover:bg-[#282828] transition-all duration-[0.3] ease-in-out"
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
          <section className="pb-[40px] px-8 pt-2 w-full box-border">
            <div className="mt-8 flex justify-between flex-row">
              <div className="flex-[1_1_50%] flex flex-row text-[15px]">
                {RightFooterLinks.map((e, index) => (
                  <ul
                    key={index}
                    className="mr-6 mb-8 flex flex-col justify-start items-start md:w-[183px]"
                  >
                    <p className="font-bold">{e.title}</p>
                    {e.links.map((e, index) => (
                      <li key={index} className="mt-2  text-[#A7A7A7] ">
                        <span className="pb-2"> {e.LinkName}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div>
                <a href="/">Inst</a>
                <a href="/">Inst</a>
                <a href="/">Inst</a>
              </div>
            </div>
            footer
          </section>
        </main>
      </div>
      <BottomBlock />
    </div>
  );
};

export default Home;
