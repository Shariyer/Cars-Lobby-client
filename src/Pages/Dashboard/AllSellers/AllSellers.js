/** @format */

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useAllSellers from "../../../Hooks/useAllSellers/useAllSellers";
import Loading from "../../Loading/Loading";

const AllSellers = () => {
  const { user } = useContext(authContext);
  const [allSellers, isLoading, refetch] = useAllSellers(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  // console.log(allSellers, "all sellers ");
  const handleDeleteSeller = (id) => {
    const agree = window.confirm("Sure? Want to delete");
    if (agree) {
      fetch(
        `http://localhost:5000/users/allBuyers/${id}?email=${user?.email}`,
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
                  <button
                    onClick={() => handleDeleteSeller(seller._id)}
                    className="btn btn-ghost bg-red-600  "
                  >
                    Delete
                  </button>
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
