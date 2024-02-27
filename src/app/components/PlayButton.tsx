import Image from "next/image";
import React from "react";

const PlayButton = ({ bg, MySize }: { bg: string; MySize: string }) => {
  return (
    <button
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
