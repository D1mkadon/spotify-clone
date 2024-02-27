import Link from "next/link";
import React from "react";

const BrowseAllComponent = ({
  title,
  href,
}: {
  title: string;
  href: string;
}) => {
  return (
    <div className="flex relative justify-between items-center w-full my-4 font-bold h-[30px]">
      <Link
        href={href}
        className="hover:underline text-[22px] pl-0"
        scroll={true}
      >
        {title}
      </Link>
      <Link
        href={href}
        className="hover:underline text-[#B3b3b3]"
        scroll={true}
      >
        <span className="ml-2 mt-[2px] text-[13px]"> Show all</span>
      </Link>
    </div>
  );
};

export default BrowseAllComponent;
