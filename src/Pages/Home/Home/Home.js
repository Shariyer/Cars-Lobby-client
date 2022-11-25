/** @format */

import React from "react";
import AboutUs from "../AboutUs/AboutUs";
import AdvertiseMent from "../AdvertiseMent/AdvertiseMent";
import Banner from "../Banner/Banner";
import ProductCategories from "../ProductCategories/ProductCategories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <ProductCategories></ProductCategories>
      <AdvertiseMent></AdvertiseMent>
      <AboutUs></AboutUs>
    </div>
  );
};

export default Home;
