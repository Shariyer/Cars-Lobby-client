/** @format */

import React from "react";

const Slide = ({ slideData }) => {
  const { id, previous, next, img } = slideData;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-fit mx-auto">
      <div className="gradient-img">
        <img src={img} alt="" className="w-fit rounded-2xl" />
      </div>
      <div className="absolute flex justify-center transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a
          href={`#slide${previous}`}
          className="btn btn-circle bg-warning text-black border-none mr-5"
        >
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
      <h1 className=" text-s lg:text-5xl md:text-2xl font-bold text-white absolute flex justify-start transform -translate-y-1/2 left-12 top-1/4">
        Get Your <br /> Dream Car at <br /> Premium Price
      </h1>
      <p className="text-s md:text-2xl lg:text-3xl font-bold text-white  absolute flex justify-start transform -translate-y-1/2 left-12 top-1/2">
        This is only place where we provide the largest premium 2nd hand or
        resale products at best price. You can also get special discount if you
        are lucky. Get before any one else does. Ride your dream car.
      </p>
      <div className="font-bold text-white absolute flex justify-start transform -translate-y-1/2 right-12 top-3/4">
        <button className="font-extrabold btn btn-outline btn-warning">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Slide;
