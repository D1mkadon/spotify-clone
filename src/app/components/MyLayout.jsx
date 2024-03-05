"use client";
import { useRef, useState } from "react";
import BottomBlock from "./BottomBlock/BottomBlock";
import Footer from "./Footer_and_Header/Footer";
import Header from "./Footer_and_Header/Header";
import LeftBlock from "./LeftBlock/LeftBlock";

const MyLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollRef = useRef();

  const scrollHandler = () => {
    if (scrollRef.current.scrollTop > 60) {
      setIsScrolled(true);
    }
    if (scrollRef.current.scrollTop < 60) {
      setIsScrolled(false);
    }
  };
  return (
    <div className="MainContainer">
      <LeftBlock />
      <div
        onScroll={scrollHandler}
        ref={scrollRef}
        className="flex overflow-y-auto rounded-lg  scr"
      >
        <div className="h-fit min-h-[100vh] w-full flex flex-col relative rounded-lg box-border bg-[#121212]">
          <Header isScrolled={isScrolled} />
          <main className="flex flex-col flex-[0_0_auto] w-full box-border relative rounded-lg top-[-64px] bg-[#121212]">
            <div className="flex-[0_0_auto] h-fit">{children}</div>

            <Footer />
          </main>
        </div>
      </div>
      <BottomBlock />
    </div>
  );
};

export default MyLayout;
