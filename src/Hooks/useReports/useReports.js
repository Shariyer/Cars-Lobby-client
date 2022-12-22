/** @format */

import { useQuery } from "@tanstack/react-query";
const useReports = (email) => {
  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async (email) => {
      try {
        const res = await fetch(
          `https://b612-used-products-resale-server-side-shariyer.vercel.app/reports?email=${email}`,
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

  return [reports, isLoading, refetch];
};

export default useReports;
