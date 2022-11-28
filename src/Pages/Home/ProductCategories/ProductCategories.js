/** @format */

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories", {
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  //   console.log("Product categories:", categories);
  return (
    <div className="mt-10 py-10 ">
      <h3 className="text-center text-3xl font-extrabold text-white">
        Cars Lobby's Available Categories:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="card w-96  shadow-xl mx-auto">
            <div className="card-body">
              <p className="text-center font-bold text-xl text-yellow-400">
                Choose Category
              </p>
              <h2 className="text-center font-bold text-2xl text-white">
                Car Category: {category.categoryName}
              </h2>
              <div className="card-actions justify-center items-center">
                <Link to={`/category/${category.categoryName}`}>
                  <button className="btn btn-primary font-bold">
                    See Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
