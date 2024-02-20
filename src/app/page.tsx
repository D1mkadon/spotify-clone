import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div className="block">
      <nav className="h-full leftSideBlock">
        <div>
          <div className="flex">
            <a href="/" className=" h-[24px] mt-[20px] px-[24px]">
              <Image
                src={"/spotify.svg"}
                alt="spotify Logo"
                width={78}
                height={24}
              />
            </a>
          </div>
          <ul className="py-[8px] px-[12px]">
            <li className="h-[48px] py-[4px] px-[12px]">
              <a href="/" className="flex gap-[20px] h-[40px] items-center">
                <Image
                  src={"/home.svg"}
                  alt="spotify Logo"
                  width={24}
                  height={24}
                />
                <span>Home</span>
              </a>
            </li>
            <li className="h-[48px] py-[4px] px-[12px]">
              <a href="/" className="flex gap-[20px] h-[40px] items-center">
                <Image
                  src={"search.svg"}
                  alt="spotify Logo"
                  width={24}
                  height={24}
                />
                <span>Search</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div>
            <div className="flex justify-between py-2 px-4 items-center">
              <div>
                <button className="flex items-center gap-[12px] h-10 py-1 px-2 libraryLink">
                  <Image
                    src={"/library.svg"}
                    alt="spotify Logo"
                    width={24}
                    height={24}
                  />
                  <span className="text-[#A7A7A7]">Your Library</span>
                </button>
              </div>
              <Image
                className="p-2 sss rounded-full cursor-pointer"
                src={"/plus.svg"}
                alt="spotify Logo"
                width={32}
                height={32}
              />
            </div>
            <div></div>
          </div>
          <div></div>
        </div>
      </nav>
      <div className="bg-blue-800 rightSideBlock">secondDiv</div>
    </div>
  );
};

export default Home;
