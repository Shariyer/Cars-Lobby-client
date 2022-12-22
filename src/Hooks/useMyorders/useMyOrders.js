/** @format */

import { useQuery } from "@tanstack/react-query";

const useMyOrders = (email) => {
  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://b612-used-products-resale-server-side-shariyer.vercel.app/bookings?email=${email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("carsLobbyToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  return [myOrders, isLoading, refetch];
};

export default useMyOrders;
