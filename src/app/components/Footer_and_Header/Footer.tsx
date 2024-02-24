import { RightFooterLinks } from "@/app/data/RightFooterLinks"
import Image from "next/image"


const Footer = () => {
  return  <section className="pb-[40px] px-8 pt-12 w-full box-border">
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
}

export default Footer