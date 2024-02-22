"use client";
import React from "react";

import LeftBlock from "./components/LeftBlock";
import RightBlock from "./components/RightBlock";

import BottomBlock from "./components/BottomBlock";
import { SessionProvider } from "next-auth/react";

const Home = ({ session }: any) => {
  return (
    <SessionProvider session={session}>
      <div className="block">
        <LeftBlock />
        <RightBlock />
        <BottomBlock />
      </div>
    </SessionProvider>
  );
};

export default Home;
