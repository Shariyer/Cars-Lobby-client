/** @format */

import { useEffect, useState } from "react";

const useMyProducts = (email) => {
  const [myProducts, setMyProducts] = useState([]);
  const [isMyProductsLoading, setMyProductsLoading] = useState(true);
  // console.log(email, "email");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/cars/${email}?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMyProducts(data);
          setMyProductsLoading(false);
        });
    }
  }, [email]);
  return [myProducts, isMyProductsLoading];
};

export default useMyProducts;
