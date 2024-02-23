import Image from "next/image";
import PlusIcon from "../data/Icons/plus";
import LibraryBlock from "./LibraryBlock";
import { LibraryData } from "../data/libraryData";
import { LeftFooterLinks } from "../data/LeftFooterLinks";

const LeftBlock = () => {
  return (
    <nav className="leftSideBlock sticky top-2 h-[90vh] flex-[0_0_auto]">
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
      <div className="flex flex-col justify-between flex-[0_0_auto] h-[80%] ">
        <div>
          <div className="flex justify-between py-2 px-4 items-center">
            <div>
              <button className="flex items-center gap-[12px] h-10 py-1 px-2 libraryLink">
                <Image
                  src={"/library.svg"}
                  alt="spotify Logo"
                  width={24}
                  height={24}
                  style={{ color: "#fff" }}
                />
                <span className="text-[#A7A7A7]">Your Library</span>
              </button>
            </div>
            <PlusIcon className="text-[#9BA2AE] hover:text-white plusIcon rounded-full cursor-pointer transition-all ease-in-out p-2" />
          </div>
          <div className="flex flex-col gap-2 pt-0 px-2 pb-2">
            {LibraryData.map((e, index) => (
              <LibraryBlock
                key={index}
                title={e.title}
                description={e.description}
                buttonText={e.buttonText}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="my-8 px-6 text-start text-[11px] text-[#b3b3b3]">
            <div className="flex flex-wrap items-center">
              {LeftFooterLinks.map((e, index) => (
                <a key={index} href="" className="mr-4 mb-2 h-[21px]">
                  {e.title}
                </a>
              ))}
            </div>
            <a href="/" className="pr-4 ">
              Cookies
            </a>
          </div>
          <div className="mb-8 px-6">
            <button className="flex text-center relative items-center justify-center border rounded-full border-white py-[3px] pr-[15px] pl-[32px] font-bold">
              <span className="absolute left-3">
                <Image
                  src="/language.svg"
                  alt="language logo"
                  width={16}
                  height={16}
                />
              </span>
              English
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftBlock;
