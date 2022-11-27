/** @format */

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useMyOrders from "../../../Hooks/useMyorders/useMyOrders";
import useTitle from "../../../Hooks/useTitle";

import Loading from "../../Loading/Loading";

const MyOrders = () => {
  useTitle("My Orders");

  const { user } = useContext(authContext);
  const [myOrders, isLoading, refetch] = useMyOrders(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  // console.log(myOrders);
  const handleDeleteOrder = (id) => {
    const agree = window.confirm("Sure? Want to delete");
    if (agree) {
      fetch(`http://localhost:5000/bookings/${id}?email=${user?.email}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data of deleting");
          if (data.deletedCount > 0) {
            refetch();
            toast.success("successfully deleted");
          }
        });
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-8 text-green-600">
        My Orders:
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>No.</th>
              <th> Product Image</th>
              <th>Product Name</th>
              <th>Purchase Price</th>
              <th>Delete</th>
              <th className="text-center">Payment</th>
            </tr>
            {myOrders.map((order, i) => (
              <tr key={i}>
                <th>{1 + i}</th>
                <td>{/* <img src="" alt="" /> */}</td>
                <td>{order?.productName}</td>
                <td>{order?.productPrice}$</td>
                <td>
                  <button
                    className="btn btn-ghost bg-red-600"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="flex justify-center items-center">
                  <button className="btn btn-ghost bg-red-600 text-white px-3 py-1">
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
