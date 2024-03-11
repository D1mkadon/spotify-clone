import Image from "next/image";
import React from "react";
import millisToTime from "@/app/data/fetchData";
import { TrackProp } from "@/types/types";
import Triangle from "@/app/data/Icons/triangle";
import state from "@/store";
import { useSnapshot } from "valtio";

const PlaylistComponent = ({
  arrProp,
}: {
  arrProp: Array<{ added_at: string; track: TrackProp }>;
}) => {
  const snap = useSnapshot(state);
  const handleClick = (value: TrackProp) => {
    state.trackID = value.id;
    state.isPlaying = true;
  };
  return (
    <div className="px-8 text-[#b3b3b3]">
      <div
        className="grid
grid-cols-[16px_6fr_4fr_3fr_1fr] capitalize px-4 border-b h-[36px] mb-4 border-b-[hsla(0,0%,100%,.1)] gap-4"
      >
        <p className="text-base">#</p>
        <p className="mr-auto text-sm"> Title</p>
        <p className="mr-auto text-sm"> album</p>
        <p className="mr-auto text-sm"> date added</p>
        <Image src={"/clock.svg"} alt="clockIcon" width={16} height={16} />
      </div>
      {arrProp.map((value, index: number) => {
        return (
          <div
            key={index}
            className="grid hover:bg-white/10 h-14 rounded group grid-cols-[16px_6fr_4fr_3fr_1fr] items-center text-sm px-4 gap-4"
          >
            <span className="flex justify-center items-center size-4 group-hover:hidden">
              {index + 1}
            </span>
            <button
              onClick={() => handleClick(value.track)}
              className="hidden justify-center items-center size-4 group-hover:flex text-white"
            >
              <Triangle className="text-white" />
            </button>
            <div className="mr-auto flex">
              <Image
                src={value.track.album.images[0].url}
                alt=""
                width={40}
                height={40}
                className="rounded size-10 mr-3"
              />
              <div className="flex flex-col">
                <p className="text-white">{value.track.name}</p>
                <p className="text-[#b3b3b3]">{value.track.artists[0].name}</p>
              </div>
            </div>
            <p className="mr-auto text-sm">{value.track.album.name}</p>
            <p className="mr-auto text-sm">
              {calculateTimeAgo(value.added_at)}
            </p>
            <p>{millisToTime(value.track.duration_ms)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistComponent;
function calculateTimeAgo(dateString: string) {
  const pastDate: any = new Date(dateString);
  const currentDate: any = new Date();

  const difference = currentDate - pastDate;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  }
}
