/** @format */

import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import ProductsModal from "./ProductsModal/ProductsModal";

const Products = () => {
  const products = useLoaderData();
  const [productModalData, setProductModalData] = useState(null);
  console.log("products are:", products);
  return (
    <div className="py-10 px-10">
      <h3 className="text-center font-bold text-3xl text-white">
        All Products from category: {products[0].categoryName} Total Products :
        {products.length}
      </h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {products.map((product) => (
          <div key={product._id} className="car rounded-2xl shadow-2xl">
            <figure className="px-10 pt-10">
              <img
                src={product?.img}
                alt={`product.name`}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-white text-center">
              <div className="flex justify-evenly items-center">
                <h4 className="flex items-center mr-5 hover:text-black hover:cursor-pointer">
                  Whitelist{" "}
                  <p className="ml-2">
                    <MdFavoriteBorder />
                  </p>
                </h4>
                <h4 className="flex items-center hover:text-black hover:cursor-pointer">
                  Report{" "}
                  <p className="ml-2">
                    <FaFontAwesomeFlag />
                  </p>
                </h4>
              </div>
              <h2 className="card-title text-white">{product?.name}</h2>
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
                <label
                  onClick={() => setProductModalData(product)}
                  htmlFor="product-booking-modal"
                  className="btn btn-primary"
                >
                  BOOK NOW
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {productModalData && (
        <ProductsModal
          productModalData={productModalData}
          setProductModalData={setProductModalData}
        ></ProductsModal>
      )}
    </div>
  );
};

export default Products;
