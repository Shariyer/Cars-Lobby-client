/** @format */

import { useQuery } from "@tanstack/react-query";

const useMyProducts = (email) => {
  const {
    data: myProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/cars/${email}?email=${email}`,
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

  return [myProducts, isLoading, refetch];
};

export default useMyProducts;
