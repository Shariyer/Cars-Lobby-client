/** @format */

import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { FaFontAwesomeFlag } from "react-icons/fa";
import ProductsModal from "./ProductsModal/ProductsModal";
import useTitle from "../../../../Hooks/useTitle";
import { authContext } from "../../../../ContextProvider/ContextProvider";
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";

const Products = () => {
  useTitle("Producs");
  const products = useLoaderData();
  const [productModalData, setProductModalData] = useState(null);
  const { user } = useContext(authContext);
  //   console.log("products are:", products);

  const handleReport = (product) => {
    fetch(`http://localhost:5000/reports/${product._id}?email=${user?.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("You have Reported This item successfully");
        }
      })
      .catch((err) => console.log(err));
  };
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
                <p>Posted at:{product?.timeOfPosting}</p>
                <h4
                  onClick={() => handleReport(product)}
                  className="flex items-center hover:text-black hover:cursor-pointer"
                >
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
              <p className="text-green-600 font-bold">
                Purchase Year : {product?.purchase} year
              </p>
              <p className="text-green-600 font-bold">
                Condition : {product?.condition}
              </p>

              <p>Meeting Location : {product?.location}</p>
              <p>Used : {product?.usage}</p>
              <div className="flex justify-between items-center">
                {product.sellerStatus === "verified" && (
                  <p className="text-blue-600">
                    <MdVerified />
                  </p>
                )}
                <p className="ml-2">Seller : {product?.sellerName}</p>
              </div>
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
