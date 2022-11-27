/** @format */

import React, { useContext } from "react";
import { authContext } from "../../../ContextProvider/ContextProvider";
import useMyProducts from "../../../Hooks/useMyProducts/useMyProducts";
import useTitle from "../../../Hooks/useTitle";
import Loading from "../../Loading/Loading";

const MyProducts = () => {
  useTitle("My Products");
  const { user } = useContext(authContext);
  const [myProducts, isMyProductsLoading] = useMyProducts(user?.email);
  if (isMyProductsLoading) {
    return <Loading></Loading>;
  }
  // console.log(myProducts, "myProducts");
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
                  <button className="btn btn-ghost bg-red-600 text-white mr-1">
                    Delete
                  </button>
                  <button className="btn btn-ghost bg-yellow-600 text-white">
                    Advertise
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

export default MyProducts;
