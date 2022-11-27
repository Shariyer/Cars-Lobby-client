/** @format */

import { useEffect, useState } from "react";

const useAllBuyers = (email) => {
  const [allBuyers, setAllBuyers] = useState([]);
  const [isAllSellerLoading, setAllBuyersLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/allBuyers?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAllBuyers(data);
          setAllBuyersLoading(false);
        });
    }
  }, [email]);
  return [allBuyers, isAllSellerLoading];
};

export default useAllBuyers;
