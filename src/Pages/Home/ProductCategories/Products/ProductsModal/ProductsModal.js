/** @format */

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../../../ContextProvider/ContextProvider";
import Loading from "../../../../Loading/Loading";

const ProductsModal = ({ productModalData, setProductModalData }) => {
  const { user, loading } = useContext(authContext);
  //   console.log("productModalData", productModalData);
  const { name, resalePrice } = productModalData;
  if (loading) {
    return <Loading></Loading>;
  }

  const handleModalForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const customerName = form.customerName.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const customerMeetingLocation = form.customerMeetingLocation.value;

    const carBooking = {
      productName: name,
      customerName: customerName,
      productPrice: resalePrice,
      customerEmail: email,
      productStatus: "booked",
      customerContact: phone,
      customerMeetingLocation: customerMeetingLocation,
    };
    //  posting booking data
    fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
      },
      body: JSON.stringify(carBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Congratulations!!! Booking Confirmed");

          setProductModalData(null);
        } else {
          toast.error(data.message);
          //   setTreatmentName(null);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input
        type="checkbox"
        id="product-booking-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="product-booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center text-green-600">
            {name}
          </h3>
          <form onSubmit={handleModalForm} className="py-4 ">
            <div className="rounded-2xl ">
              <label className="label">Customer Name:</label>
              <input
                name="customerName"
                defaultValue={user?.displayName}
                type="text"
                disabled
                placeholder="Type your name here"
                className="input input-bordered input-accent w-full mb-2"
              />
            </div>
            <div className="rounded-2xl">
              <label className="label">Product Price:</label>
              <input
                name="price"
                defaultValue={resalePrice}
                type="text"
                disabled
                placeholder="Type your price here"
                className="input input-bordered input-accent w-full mb-2"
              />
            </div>
            <div className="rounded-2xl">
              <label className="label">Customer Email:</label>
              <input
                name="email"
                defaultValue={user?.email}
                type="text"
                disabled
                placeholder="Type your email here"
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
            <div className="rounded-2xl">
              <label className="label">Meeting Location:</label>
              <input
                name="customerMeetingLocation"
                type="text"
                placeholder="Type your meeting location "
                className="input input-bordered input-accent w-full mb-2"
              />
            </div>

            <input
              className="btn w-full btn-success text-white"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductsModal;
