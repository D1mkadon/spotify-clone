import Image from "next/image";
import Link from "next/link";

interface cardProp {
  imgProp: string;
  nameProp: string;
  descriptionProp?: string;
  ArtistProp?: string;
  ArtistId?: string;
  albumType?: string;
}

const MusicCard = ({
  imgProp,
  nameProp,
  descriptionProp,
  ArtistProp,
  ArtistId,
  albumType,
}: cardProp) => {
  return (
    <div className="p-4 rounded-lg relative bg-[#181818] cursor-pointer hover:bg-[#282828] h-full w-full transition-all duration-[0.3] ease-in-out">
      <div className="pb-[100%] relative mb-4">
        <Image
          src={imgProp}
          alt="/"
          fill={true}
          sizes="max-w-320px"
          className="w-full  h-full top-0 left-0 object-cover object-center"
        />
      </div>
      <div className="max-w-full min-h-[62px]">
        <p className="inline-block max-w-full pb-1 text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap h-[26px]">
          {nameProp}
        </p>
        <div className="">
          <div className="flex justify-between MusicCardDescription">
            {ArtistProp && ArtistId && (
              <Link href={`/artist/${ArtistId}`} className="hover:underline">
                {ArtistProp}
              </Link>
            )}
            {descriptionProp && <p className="capitalize">{descriptionProp}</p>}
            {albumType && <p className="capitalize">{albumType}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
