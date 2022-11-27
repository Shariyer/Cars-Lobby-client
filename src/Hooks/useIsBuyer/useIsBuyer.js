/** @format */

import { useEffect, useState } from "react";

const useIsBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      // route will be changed
      fetch(`http://localhost:5000/users/buyer/${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setIsBuyer(data.isBuyer);
          setIsBuyerLoading(false);
        });
    }
  }, [email]);
  return [isBuyer, isBuyerLoading];
};

export default useIsBuyer;
