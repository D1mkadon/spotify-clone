import React from "react";

const ArtistCard = ({
  imgProp,
  nameProp,
  TypeProp,
}: {
  imgProp: string;
  nameProp: string;
  TypeProp: string;
}) => {
  return (
    <div className="p-4 rounded-lg relative bg-transparent cursor-pointer hover:bg-[#282828] h-full w-full transition-all duration-[0.3] ease-in-out">
      <div className="pb-[100%] relative mb-4">
        <img
          src={imgProp}
          alt="/"
          width={160}
          height={160}
          sizes="max-w-320px"
          className="w-full absolute h-full size-[160px] top-0 left-0 object-cover object-center rounded-full"
        />
      </div>
      <div className="max-w-full min-h-[62px]">
        <p className="inline-block max-w-full pb-1 text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap h-[26px]">
          {nameProp}
        </p>
        <div className="">
          <div className="flex justify-between MusicCardDescription">
            <p className="capitalize">{TypeProp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
