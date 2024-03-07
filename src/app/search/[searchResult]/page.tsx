"use client";
import { fetchSearch } from "@/app/data/fetchData";
import { searchDataProp } from "@/types/types";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { searchResult: string } }) => {
  const [searchData, setSearchData] = useState<searchDataProp>();
  useEffect(() => {
    fetchSearch(params.searchResult, setSearchData);
    const f = async () => {};
    f();
  }, []);

  console.log(searchData);
  if (
    !searchData?.albums.items.length ||
    !searchData?.artists.items.length ||
    !searchData?.tracks.items.length
  )
    return (
      <p className="min-h-[60vh] flex justify-center items-center">
        <span className="mt-16">Loading...</span>
      </p>
    );
  return <div className="min-h-[60vh] mt-16">page</div>;
};

export default page;
