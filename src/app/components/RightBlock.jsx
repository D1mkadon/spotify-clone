"use client";
import LeftArrow from "../data/Icons/leftArrow";
import RightArrow from "../data/Icons/rightArrow";
import Image from "next/image";
import { RightFooterLinks } from "../data/RightFooterLinks";
import Login from "../data/Login";

import MusicSection from "./MusicSection";
const RightBlock = ({ isScrolled }) => {
  return (
    <div className="h-full flex flex-col relative rounded-lg box-border ">
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
      {/* <div className="h-16"></div> */}
      <main className="flex flex-col flex-[1] relative box-border rounded-lg bg-[#121212]">
        <div className="bgMain rounded-lg"></div>
        <section className="MusicContainer font-bold ">
          <MusicSection />
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
