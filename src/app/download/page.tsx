import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="-mt-[200px] w-full text-white bgInstall flex">
      <div className=" pt-[200px] h-full flex flex-col justify-center items-center w-full">
        <div className="w-[640px]">
          <Image
            src={
              "https://open.spotifycdn.com/cdn/images/devices/mac.3fbeb8c6.png"
            }
            alt="/"
            height={396}
            width={640}
          />
          <div className="flex justify-center flex-wrap text-center">
            <h2 className="text-[1.75rem] leading-7 font-bold pb-6">
              Seamlessly listen to music you love. Download the Spotify app for
              your computer.
            </h2>
            <Link
              href={"https://www.spotify.com/de/download/windows/"}
              className="text-black bg-[#1ed760] flex justify-center items-center font-bold rounded-full hover:scale-[1.04]"
            >
              <span className="py-2 px-6 leading-7">Get our free app</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
