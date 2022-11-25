/** @format */

import React from "react";
import Slide from "./Slide/Slide";
import img1 from "../../../assets/bannerImage/nissan gt-r.jpg";
import img2 from "../../../assets/bannerImage/dodge.jpg";
import img3 from "../../../assets/bannerImage/mazda.jpg";
import img4 from "../../../assets/bannerImage/mustang.jpg";
import img5 from "../../../assets/bannerImage/audi.jpg";
import img6 from "../../../assets/bannerImage/rangeRover.jpg";

const bannerData = [
  {
    img: img1,
    previous: 6,
    id: 1,
    next: 2,
  },
  {
    img: img2,
    previous: 1,
    id: 2,
    next: 3,
  },
  {
    img: img3,
    previous: 2,
    id: 3,
    next: 4,
  },
  {
    img: img4,
    previous: 3,
    id: 4,
    next: 5,
  },
  {
    img: img5,
    previous: 4,
    id: 5,
    next: 6,
  },
  {
    img: img6,
    previous: 5,
    id: 6,
    next: 1,
  },
];

const Banner = () => {
  return (
    <div className="carousel w-full rounded-2xl mt-1">
      {bannerData.map((slide) => (
        <Slide key={slide.id} slideData={slide}></Slide>
      ))}
    </div>
  );
};

export default Banner;
