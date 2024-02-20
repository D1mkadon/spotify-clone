import React from "react";

const LibraryBlock = ({ title, description, buttonText }) => {
  return (
    <aside className="py-4 px-5 gap-5 flex flex-col my-2 justify-center items-start rounded-lg ">
      <div className="flex flex-col gap-2 flex-wrap items-start ">
        <h2 className="h-[22px] font-bold">{title}</h2>
        <p className="text-[14px] h-5 ">{description}</p>
      </div>
      <a href="/" className="flex box-border hover:scale-[1.05]">
        <span className="bg-white text-black rounded-full text-[13px] py-1 px-4 h-8 flex justify-center items-center font-bold">
          {buttonText}
        </span>
      </a>
    </aside>
  );
};

export default LibraryBlock;
