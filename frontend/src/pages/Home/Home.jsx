import Slider from "@/components/Slider/Slider";
import React from "react";

import fashion1 from "/fashion-1.jpg";
import fashion2 from "/fashion-2.jpg";
import fashion3 from "/fashion-3.jpg";
import LandingText from "@/components/LandingText/LandingText";
import Recent from "./Recent";
import BannerTwo from "./BannerTwo";

const IMAGES = [fashion1, fashion2, fashion3];

const Home = () => {
  return (
    <div>
      <div className="absolute h-[50vh] md:h-[100vh] w-full z-10 flex items-center justify-center">
        <LandingText />
      </div>
      <div
        style={{
          maxWidth: "100%",
          width: "100vw",
          aspectRatio: "10/6",
        }}
        className="h-[50vh] md:h-[80vh]"
      >
        <Slider imageUrls={IMAGES} />
      </div>
      <BannerTwo />
      <Recent />
    </div>
  );
};

export default Home;
