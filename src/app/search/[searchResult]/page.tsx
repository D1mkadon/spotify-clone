"use client";
import { fetchSearch } from "@/app/data/fetchData";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { searchResult: string } }) => {
  const [searchData, setSearchData] = useState();
  useEffect(() => {
    fetchSearch(params.searchResult, setSearchData);
    const f = async () => {};
    f();
  }, []);
  
  console.log(searchData);
  return <div className="min-h-[60vh] mt-16">page</div>;
};

export default page;
