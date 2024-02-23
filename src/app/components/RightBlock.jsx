"use client";
import LeftArrow from "../data/Icons/leftArrow";
import RightArrow from "../data/Icons/rightArrow";
import Image from "next/image";
import { cardsData } from "../data/cardsData";
import { RightFooterLinks } from "../data/RightFooterLinks";
import Login from "../data/Login";

const RightBlock = () => {
  return (
    <div className=" rightSideBlock flex flex-col relative ">
      <header className="h-16 flex absolute w-full items-center gap-2 justify-between py-4 px-6 z-[2] bg-[rgba(0,0,0,.5);] ">
        <div className="flex gap-2">
          <button
            disabled
            className="bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full"
          >
            <LeftArrow className={"text-[#7a7a7a]"} />
          </button>
          <button
            disabled
            className="bg-black/[0.7] flex justify-center items-center w-8 h-8 rounded-full"
          >
            <RightArrow className={"text-[#7a7a7a]"} />
          </button>
        </div>
        <div>
          <Login />
        </div>
      </header>
      <div className="bgMain"></div>
      <div className="h-16"></div>
      <main className="z-[1] flex flex-col">
        <section className="MusicContainer font-bold">
          <div className="flex justify-between items-center w-full  h-[30px]">
            <a href="/" className="hover:underline text-[22px] pl-0">
              Spotify Playlists
            </a>
            <a href="/" className="hover:underline text-[#B3b3b3]">
              <span className="ml-2 mt-[2px] text-[13px]"> Show all</span>
            </a>
          </div>
          <section className="">
            <div className="musicSection">
              {cardsData.map((e, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg relative bg-[#181818] cursor-pointer hover:bg-[#282828] h-full w-full transition-all duration-[0.3] ease-in-out"
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
                    <div className="MusicCardDescription">{e.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <section>
       <div>Sleep</div>
     </section> */}
        </section>
        <section className="pb-[40px] px-8 pt-12 w-full box-border">
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
            <div className="mb-10">
              <div className="pr-4 inline">
                <a
                  href="/"
                  className="hover:bg-[#727272] h-10 w-10 rounded-full bg-[#292929] inline-flex justify-center items-center"
                >
                  <Image
                    src={"instagram.svg"}
                    alt="spotify Logo"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
              <div className="pr-4 inline">
                <a
                  href="/"
                  className="h-10 w-10 rounded-full hover:bg-[#727272] bg-[#292929] inline-flex justify-center items-center"
                >
                  <Image
                    src={"twitter.svg"}
                    alt="spotify Logo"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
              <div className="pr-4 inline">
                <a
                  href="/"
                  className="h-10 w-10 rounded-full bg-[#292929] hover:bg-[#727272] inline-flex justify-center items-center"
                >
                  <Image
                    src={"facebook.svg"}
                    alt="spotify Logo"
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </div>
          </div>
          <hr className="border-t border-white/[0.1] mb-6" />
          <div className="flex flex-row items-start pt-4 text-[14px] text-[#A7A7A7]">
            © 2024 Spotify AB
          </div>
        </section>
      </main>
    </div>
  );
};

export default RightBlock;
