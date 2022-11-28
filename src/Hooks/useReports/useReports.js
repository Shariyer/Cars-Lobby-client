/** @format */

import { useQuery } from "@tanstack/react-query";
const useReports = () => {
  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async (email) => {
      try {
        const res = await fetch(
          `http://localhost:5000/reports?email=${email}`,
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
