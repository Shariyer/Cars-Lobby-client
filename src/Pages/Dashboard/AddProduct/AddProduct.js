/** @format */

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useTitle from "../../../Hooks/useTitle";
import useVerifySeller from "../../../Hooks/useVerifySeller/useVerifySeller";
// import { ImFolderUpload } from "react-icons/im";
const AddProduct = () => {
  const { user } = useContext(authContext);
  const [verification] = useVerifySeller(user?.email);
  const navigate = useNavigate();
  useTitle("Add Product");
  // time
  const date = new Date();
  const time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const imageHostKey = process.env.REACT_APP_ImagebbKey;
  const handleAddProduct = (data) => {
    // console.log(data, "data");
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((ImgbbData) => {
        if (ImgbbData.success) {
          console.log(ImgbbData.data.url, "inside Img BB");
          //seller carInformation object
          let sellerStatus = "";
          if (verification) {
            sellerStatus = "verified";
          } else {
            sellerStatus = "not verified";
          }
          const carInfo = {
            categoryName: data.categoryName,
            name: data.name,
            purchase: data.purchaseYear,
            condition: data.condition,
            img: ImgbbData.data.url,
            originalPrice: data.originalPrice,
            resalePrice: data.resalePrice,
            location: data.location,
            usage: data.usage,
            sellerName: user?.displayName,
            sellerEmail: user?.email,
            sellerContact: data.phone,
            sellerStatus: sellerStatus,
            productStatus: "available",
            timeOfPosting: time,
          };
          fetch(
            `https://b612-used-products-resale-server-side-shariyer.vercel.app/cars?email=${user?.email}`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem(
                  "carsLobbyToken"
                )}`,
              },
              body: JSON.stringify(carInfo),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.acknowledged) {
                toast.success(`${data.name} successfully added`);
                navigate("/dashboard/myProducts");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="p-8 mt-2 rounded-2xl bg-slate-700 shadow-2xl">
        <h3 className="text-center font-bold text-3xl text-green-700">
          Give Product Details
        </h3>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="py-4 text-white"
        >
          <div className="rounded-2xl ">
            <label className="label">Car Name:</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              placeholder="Type your Product name "
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="rounded-2xl ">
            <label className="label">Car Category Name:</label>
            <input
              type="text"
              {...register("categoryName", {
                required: "categoryName is Required",
              })}
              placeholder="Type your category  name "
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.categoryName && (
              <p className="text-red-500">{errors.categoryName.message}</p>
            )}
          </div>
          <div className="rounded-2xl ">
            <label className="label">Car Purchased Year:</label>
            <input
              type="text"
              {...register("purchaseYear", {
                required: "purchase Year is Required",
              })}
              placeholder="Type your category  name "
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.categoryName && (
              <p className="text-red-500">{errors.categoryName.message}</p>
            )}
          </div>
          <div className="rounded-2xl ">
            <label className="label">Car Condition:</label>
            <input
              type="text"
              {...register("condition", {
                required: "car condition is Required",
              })}
              placeholder="Type your category  name "
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.condition && (
              <p className="text-red-500">{errors.condition.message}</p>
            )}
          </div>
          <div className="rounded-2xl ">
            <label className="label"> Image:</label>
            <input
              type="file"
              {...register("image", {
                required: "image is Required",
              })}
              placeholder="Upload your image "
              className="border py-2 px-2 input-accent bg-base-100  rounded w-full mb-2"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div className="rounded-2xl">
            <label className="label"> Original Price:</label>
            <input
              type="number"
              {...register("originalPrice", {
                required: "original Price is Required",
              })}
              placeholder="Type your price here"
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.originalPrice && (
              <p className="text-red-500">{errors.originalPrice.message}</p>
            )}
          </div>
          <div className="rounded-2xl">
            <label className="label"> Resale Price:</label>
            <input
              type="number"
              {...register("resalePrice", {
                required: "resale Price is Required",
              })}
              placeholder="Type your price here"
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.resalePrice && (
              <p className="text-red-500">{errors.resalePrice.message}</p>
            )}
          </div>
          <div className="rounded-2xl">
            <label className="label"> Used for :</label>
            <input
              type="text"
              {...register("usage", {
                required: "product usage is Required",
              })}
              placeholder="Type your usage here"
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.usage && (
              <p className="text-red-500">{errors.usage.message}</p>
            )}
          </div>
          <div className="rounded-2xl">
            <label className="label">Primary Meeting Location:</label>
            <input
              type="text"
              {...register("location", {
                required: "location is Required",
              })}
              placeholder="Type your location here"
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="rounded-2xl">
            <label className="label">Contact Number:</label>
            <input
              type="number"
              {...register("phone", {
                required: "phone is Required",
              })}
              placeholder="Type your contact number"
              className="input input-bordered input-accent w-full mb-2"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
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
