/** @format */

import { useQuery } from "@tanstack/react-query";

const useAdvertisements = (email) => {
  const {
    data: advertisements,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/advertise?email=${email}`,
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

  return [advertisements, isLoading, refetch];
};

export default useAdvertisements;
