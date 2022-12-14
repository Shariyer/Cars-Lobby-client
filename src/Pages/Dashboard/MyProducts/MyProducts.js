/** @format */

import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useMyProducts from "../../../Hooks/useMyProducts/useMyProducts";
import useTitle from "../../../Hooks/useTitle";
import Loading from "../../Loading/Loading";

const MyProducts = () => {
  useTitle("My Products");
  const { user } = useContext(authContext);
  const [myProducts, isLoading, refetch] = useMyProducts(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDeleteProduct = (id) => {
    const agree = window.confirm("Sure? Want to delete");
    if (agree) {
      fetch(
        `https://b612-used-products-resale-server-side-shariyer.vercel.app/cars/${id}?email=${user?.email}`,
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
  // console.log(myProducts, "myProducts");
  // advertisement
  const handleAdvertise = (myProduct) => {
    fetch(
      `https://b612-used-products-resale-server-side-shariyer.vercel.app/advertise/${myProduct._id}?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
        body: JSON.stringify(myProduct),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Congratulation!! Your Product is Advertising now");
        }
      });
  };
  // stop advertisement
  const handleStopAdvertise = (id) => {
    fetch(
      `https://b612-used-products-resale-server-side-shariyer.vercel.app/advertise/${id}?email=${user?.email}`,
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
          toast.success(`successfully stop Advertising`);
        }
      });
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-8 text-green-600">
        My Orders:{myProducts?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th>No.</th>
              <th> Product Image</th>
              <th>Product Name</th>
              <th>Purchase Price</th>
              <th className="text-center">Action</th>
            </tr>
            {myProducts.length === 0 ? (
              <h3 className="text-center text-red-700 font-bold text-3xl">
                You Have no Product yet
              </h3>
            ) : (
              <>
                {myProducts.map((myProduct, i) => (
                  <tr key={i}>
                    <th>{1 + i}</th>
                    <td>
                      <img
                        src={myProduct?.img}
                        className="w-10 rounded-full"
                        alt=""
                      />
                    </td>
                    <td>{myProduct?.name}</td>
                    <td>{myProduct?.resalePrice}$</td>
                    <td className="flex justify-center items-center">
                      <button
                        onClick={() => handleDeleteProduct(myProduct._id)}
                        className="btn btn-ghost bg-red-600 text-white mr-1"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleAdvertise(myProduct)}
                        className="btn btn-ghost bg-yellow-600 text-white mr-1"
                      >
                        Advertise
                      </button>
                      <button
                        onClick={() => handleStopAdvertise(myProduct._id)}
                        className="btn btn-ghost bg-red-600 text-white"
                      >
                        Stop Advertise
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

export default MyProducts;
