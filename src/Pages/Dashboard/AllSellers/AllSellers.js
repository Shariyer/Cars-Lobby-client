/** @format */

import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useAllSellers from "../../../Hooks/useAllSellers/useAllSellers";
import Loading from "../../Loading/Loading";

const AllSellers = () => {
  const { user } = useContext(authContext);
  const [verify, setVerify] = useState(true);
  const [allSellers, isLoading, refetch] = useAllSellers(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  // console.log(allSellers, "all sellers ");
  const handleDeleteSeller = (id) => {
    const agree = window.confirm("Sure? Want to delete");
    if (agree) {
      fetch(
        `https://b612-used-products-resale-server-side-shariyer.vercel.app/users/allBuyers/${id}?email=${user?.email}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
          },
        }
      )
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
  // handle verify sellers
  const handleVerify = (id) => {
    fetch(
      `https://b612-used-products-resale-server-side-shariyer.vercel.app/users/allSellers/${id}?email=${user?.email}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "verify seller");
        if (data.modifiedCount > 0) {
          setVerify(false);
        }
      })
      .catch((err) => console.log(err));
  };
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
            {allSellers.length === 0 ? (
              <h3 className="text-center text-red-700 font-bold text-3xl">
                No seller Available
              </h3>
            ) : (
              <>
                {allSellers.map((seller, i) => (
                  <tr key={i}>
                    <th>{1 + i}</th>
                    <td>{seller?.name}</td>
                    <td className="normal-case">{seller?.email}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteSeller(seller._id)}
                        className="btn btn-ghost bg-red-600  "
                      >
                        Delete
                      </button>
                    </td>
                    <td className="flex justify-center items-center">
                      {verify && (
                        <button
                          onClick={() => handleVerify(seller._id)}
                          className="btn btn-ghost bg-green-600  "
                        >
                          verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      }
    </div>
  );
};

export default AllSellers;
