/** @format */

import React, { useContext } from "react";
import useTitle from "../../../Hooks/useTitle";
import useAllBuyers from "../../../Hooks/useAllBuyers/useAllBuyers";
import { authContext } from "../../../ContextProvider/ContextProvider";
import Loading from "../../Loading/Loading";

const AllBuyers = () => {
  useTitle("All Buyers");
  const { user } = useContext(authContext);
  const [allBuyers, isAllSellerLoading] = useAllBuyers(user?.email);
  if (isAllSellerLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-center font-bold text-green-800 my-8 text-3xl">
        List of ALL BUYERS:
      </h1>
      {
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>No.</th>
              <th> Seller Name</th>
              <th>Seller Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allBuyers.map((buyer, i) => (
              <tr key={i}>
                <th>{1 + i}</th>
                <td>{buyer?.name}</td>
                <td className="normal-case">{buyer?.email}</td>
                <td className="flex justify-center items-center text-white">
                  <button className="btn btn-ghost bg-red-600 mr-1  ">
                    Delete
                  </button>

                  <button className="btn btn-ghost bg-green-600  ">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default AllBuyers;
