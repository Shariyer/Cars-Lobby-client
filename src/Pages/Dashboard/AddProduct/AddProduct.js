/** @format */

import React from "react";
import useTitle from "../../../Hooks/useTitle";
// import { ImFolderUpload } from "react-icons/im";
const AddProduct = () => {
  useTitle("Add Product");
  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.name.value;
    const image = form.image.value;
    const originalPrice = form.originalPrice.value;
    const resalePrice = form.resalePrice.value;
    const location = form.location.value;
    const phone = form.phone.value;

    console.log(
      productName,
      image,
      originalPrice,
      resalePrice,
      location,
      phone
    );
  };
  return (
    <div>
      <div className="p-8 mt-2 rounded-2xl bg-slate-700 shadow-2xl">
        <h3 className="text-center font-bold text-3xl text-green-700">
          Give Product Details
        </h3>
        <form onSubmit={handleAddProduct} className="py-4 text-white">
          <div className="rounded-2xl ">
            <label className="label"> Name:</label>
            <input
              name="name"
              type="text"
              placeholder="Type your Product name "
              className="input input-bordered input-accent w-full mb-2"
            />
          </div>
          <div className="rounded-2xl ">
            <label className="label"> Image:</label>
            <input
              name="image"
              type="file"
              placeholder="Upload your image "
              className="border py-2 px-2 input-accent bg-base-100  rounded w-full mb-2"
            />
          </div>
          <div className="rounded-2xl">
            <label className="label"> Original Price:</label>
            <input
              name="originalPrice"
              type="number"
              placeholder="Type your price here"
              className="input input-bordered input-accent w-full mb-2"
            />
          </div>
          <div className="rounded-2xl">
            <label className="label"> Resale Price:</label>
            <input
              name="resalePrice"
              type="number"
              placeholder="Type your price here"
              className="input input-bordered input-accent w-full mb-2"
            />
          </div>
          <div className="rounded-2xl">
            <label className="label">Primary Meeting Location:</label>
            <input
              name="location"
              type="text"
              placeholder="Type your location here"
              className="input input-bordered input-accent w-full mb-2"
            />
          </div>
          <div className="rounded-2xl">
            <label className="label">Contact Number:</label>
            <input
              name="phone"
              type="number"
              placeholder="Type your contact number"
              className="input input-bordered input-accent w-full mb-2"
            />
          </div>

          <input
            className="mt-3 btn btn-ghost bg-green-500 w-full btn-success text-white"
            type="submit"
            value="Add Product"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
