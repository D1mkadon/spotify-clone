import Image from "next/image";
import React from "react";

const PlayButton = ({
  bg,
  MySize,
  handleClick,
}: {
  bg: string;
  MySize: string;
  handleClick: any;
}) => {
  return (
    <button
      onClick={handleClick}
      style={{
        background: bg,
        width: MySize,
        height: MySize,
      }}
      className={`flex justify-center items-center bg-[##1ed760] size-14 rounded-full hover:scale-[1.04]`}
    >
      <Image src={"/triangle.svg"} alt="/" width={24} height={24} />
    </button>
  );
};

export default PlayButton;
