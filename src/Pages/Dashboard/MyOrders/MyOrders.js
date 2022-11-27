/** @format */

import React, { useContext } from "react";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useMyOrders from "../../../Hooks/useMyorders/useMyOrders";
import useTitle from "../../../Hooks/useTitle";

import Loading from "../../Loading/Loading";

const MyOrders = () => {
  useTitle("My Orders");

  const { user } = useContext(authContext);
  const [myOrders, isOrdersLoading] = useMyOrders(user?.email);
  if (isOrdersLoading) {
    return <Loading></Loading>;
  }
  // console.log(myOrders);
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
              <th className="text-center">Payment</th>
            </tr>
            {myOrders.map((order, i) => (
              <tr key={i}>
                <th>{1 + i}</th>
                <td>{/* <img src="" alt="" /> */}</td>
                <td>{order?.productName}</td>
                <td>{order?.productPrice}$</td>
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
