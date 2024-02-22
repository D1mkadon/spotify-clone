import React from "react";

import LeftBlock from "./components/LeftBlock";
import RightBlock from "./components/RightBlock";

import BottomBlock from "./components/BottomBlock";

const Home = () => {
  return (
    <div className="block">
      <LeftBlock />
      <RightBlock />
      <BottomBlock />
    </div>
  );
};

export default Home;
