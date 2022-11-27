/** @format */

import { useEffect, useState } from "react";

const useAllSellers = (email) => {
  const [allSellers, setAllSellers] = useState([]);
  const [isAllSellerLoading, setAllSellersLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/allsellers?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAllSellers(data);
          setAllSellersLoading(false);
        });
    }
  }, [email]);
  return [allSellers, isAllSellerLoading];
};

export default useAllSellers;
