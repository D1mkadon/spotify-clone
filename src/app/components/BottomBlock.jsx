const BottomBlock = () => {
  return (
    <a
      href="/"
      className="col-span-2 sticky bottom-2 flex justify-between items-center w-full flex-row z-[1] gap-6 pt-[11px] pr-[24px] pb-[7px] pl-[15px] bottomBlock "
    >
      <div>
        <p className="font-bold text-[14px]">Preview of Spotify</p>
        <p>
          Sign up to get unlimited songs and podcasts with occasional ads. No
          credit card needed.
        </p>
      </div>
      <button className="flex box-border hover:scale-[1.05]">
        <span className="bg-white text-black rounded-full text-[13px] py-2 px-8 flex justify-center items-center font-bold relative h-12 text-base">
          Sign up free
        </span>
      </button>
    </a>
  );
};

export default BottomBlock;
