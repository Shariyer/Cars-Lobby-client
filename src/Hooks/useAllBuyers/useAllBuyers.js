/** @format */

import { useQuery } from "@tanstack/react-query";

const useAllBuyers = (email) => {
  const {
    data: allBuyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://b612-used-products-resale-server-side-shariyer.vercel.app/users/allBuyers?email=${email}`,
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

  return [allBuyers, isLoading, refetch];
};

export default useAllBuyers;
