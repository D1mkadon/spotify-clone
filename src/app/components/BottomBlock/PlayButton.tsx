import state from "@/store";
import Image from "next/image";
import React from "react";
import { useSnapshot } from "valtio";

const PlayBottomButton = ({
  bg,
  MySize,
  handleClick,
}: {
  bg: string;
  MySize: string;
  handleClick: () => void;
}) => {
  const snap = useSnapshot(state);
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
      {!state.isPlaying ? (
        <Image src={"/triangle.svg"} alt="/" width={24} height={24} />
      ) : (
        <Image src={"/paused.svg"} alt="/" width={16} height={16} />
      )}
    </button>
  );
};

export default PlayBottomButton;
