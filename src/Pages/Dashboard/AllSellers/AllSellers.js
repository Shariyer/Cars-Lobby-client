/** @format */

import React, { useContext } from "react";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useAllSellers from "../../../Hooks/useAllSellers/useAllSellers";
import Loading from "../../Loading/Loading";

const AllSellers = () => {
  const { user } = useContext(authContext);
  const [allSellers, isAllSellerLoading] = useAllSellers(user?.email);
  if (isAllSellerLoading) {
    return <Loading></Loading>;
  }
  console.log(allSellers, "all sellers ");
  return (
    <div>
      <h1 className="text-center font-bold text-green-800 my-8 text-3xl">
        List of ALL SELLERS:
      </h1>
      {
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>No.</th>
              <th> Seller Name</th>
              <th>Seller Email</th>
              <th>Action</th>
              <th className="text-center">verification</th>
            </tr>
          </thead>
          <tbody>
            {allSellers.map((seller, i) => (
              <tr key={i}>
                <th>{1 + i}</th>
                <td>{seller?.name}</td>
                <td className="normal-case">{seller?.email}</td>
                <td>
                  <button className="btn btn-ghost bg-red-600  ">Delete</button>
                </td>
                <td className="flex justify-center items-center">
                  <button className="btn btn-ghost bg-green-600  ">
                    verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default AllSellers;
