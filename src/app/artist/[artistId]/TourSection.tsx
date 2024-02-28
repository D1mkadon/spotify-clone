import Link from "next/link";
import React from "react";
const tourData = [
  {
    day: "12",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
  {
    day: "1",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
  {
    day: "8",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
  {
    day: "12",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
  {
    day: "2",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
  {
    day: "6",
    month: "May",
    location: "Location",
    name: "Artist Name",
    time: "Paris La Défense Arena",
  },
];
const TourSection = () => {
  return (
    <ul className="grid grid-cols-3 gap-y-2 gap-x-4 mb-10">
      {tourData.map((e, index) => {
        return (
          <li key={index}>
            <Link
              className="grid overflow-hidden rounded p-2 gap-x-4 grid-cols-[72px_auto] items-center -ml-2 mb-2 hover:bg-white/10"
              href=""
            >
              <time className="flex flex-col bg-white/10 size-16 p-2 text-center justify-center items-center rounded font-bold">
                <h5 className="text-sm">{e.month}</h5>
                <h2 className="text-2xl">{e.day}</h2>
              </time>
              <div className="overflow-hidden ">
                <h3 className="font-bold line-clamp-1">{e.location}</h3>
                <p className="line-clamp-1">{e.name}</p>
                <span className="text-[#b3b3b3] line-clamp-1">
                  <span> Sun 7:00 PM</span> {e.time}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TourSection;
