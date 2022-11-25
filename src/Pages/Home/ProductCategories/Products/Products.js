/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";

const Products = () => {
  const products = useLoaderData();
  //   console.log("products are:", products);
  return (
    <div className="py-10 px-10">
      <h3 className="text-center font-bold text-3xl text-white">
        All Products from category: {products[0].categoryName} Total Products :
        {products.length}
      </h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="car relative rounded-2xl shadow-2xl"
          >
            <figure className="px-10 pt-10">
              <img
                src={product?.img}
                alt={`product.name`}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-white text-center">
              <div className="flex justify-evenly items-center">
                <h2 className="card-title text-white">{product?.name}</h2>
                <h4 className="flex items-center absolute right-10">
                  Whitelist <MdFavoriteBorder />
                </h4>
                <h4 className="flex items-center mr-1 absolute bottom-1/4 right-10">
                  Report <FaFontAwesomeFlag />
                </h4>
              </div>
              <p className="text-red-500">
                Original Price : {product?.originalPrice}$
              </p>
              <p className="text-green-600 font-bold">
                Resale Price : {product?.resalePrice}$ Only
              </p>
              <p>Meeting Location : {product?.location}</p>
              <p>Used : {product?.usage}</p>
              <p>Seller : {product?.sellerName}</p>
              <div className="card-actions">
                <button className="btn btn-primary">BOOK Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
