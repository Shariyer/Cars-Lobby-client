/** @format */

import { useQuery } from "@tanstack/react-query";

const useAllSellers = (email) => {
  const {
    data: allSellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allSellers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/users/allsellers?email=${email}`,
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

  return [allSellers, isLoading, refetch];
};

export default useAllSellers;
