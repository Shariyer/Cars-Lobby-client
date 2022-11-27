/** @format */

import { useEffect, useState } from "react";

const useMyOrders = (email) => {
  const [myOrders, setMyOrders] = useState([]);
  const [isOrdersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/bookings?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMyOrders(data);
          setOrdersLoading(false);
        });
    }
  }, [email]);
  return [myOrders, isOrdersLoading];
};

export default useMyOrders;
