/** @format */

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useReports from "../../../Hooks/useReports/useReports";
import useTitle from "../../../Hooks/useTitle";
import Loading from "../../Loading/Loading";

const ReportedProducts = () => {
  useTitle("Reported Products");
  const { user } = useContext(authContext);
  const [reports, isLoading, refetch] = useReports(user?.email);
  if (isLoading) {
    return <Loading />;
  }
  const handleDeleteReport = (id) => {
    const agree = window.confirm("Sure? Want to delete");
    if (agree) {
      fetch(
        `https://b612-used-products-resale-server-side-shariyer.vercel.app/reports/${id}?email=${user?.email}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data, "data of deleting");
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
        Reported Products
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>No.</th>
              <th> Product Image</th>
              <th>Product Name</th>
              <th>seller Name</th>
              <th>seller Email</th>
              <th>Delete</th>
            </tr>
            {reports.length === 0 ? (
              <h3 className="text-center text-red-700 font-bold text-3xl">
                You have no orders Yet!!
              </h3>
            ) : (
              <>
                {reports.map((report, i) => (
                  <tr key={report._id}>
                    <th>{1 + i}</th>
                    <td>
                      <img
                        src={report?.img}
                        className="w-10 rounded-full"
                        alt=""
                      />
                    </td>
                    <td>{report?.name}</td>
                    <td>{report?.sellerName}</td>
                    <td className="normal-case">{report?.sellerEmail}</td>
                    <td>
                      <button
                        className="btn btn-ghost bg-red-600"
                        onClick={() => handleDeleteReport(report._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProducts;
