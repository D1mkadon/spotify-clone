"use client";
import React, { MutableRefObject, useRef, useState } from "react";

import LeftBlock from "./components/LeftBlock";
import RightBlock from "./components/RightBlock";

import BottomBlock from "./components/BottomBlock";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef() as MutableRefObject<HTMLDivElement>;

  const scrollHandler = () => {
    if (scrollRef.current.scrollTop > 60) {
      setIsScrolled(true);
    }
    if (scrollRef.current.scrollTop < 60) {
      setIsScrolled(false);
    }
  };
  return (
    <div className="block">
      <LeftBlock />
      <div
        onScroll={scrollHandler}
        ref={scrollRef}
        className="flex h-[90vh] overflow-y-auto rounded-lg"
      >
        <RightBlock isScrolled={isScrolled} />
      </div>
      <BottomBlock />
    </div>
  );
};

export default Home;
