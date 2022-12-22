/** @format */

import { useQuery } from "@tanstack/react-query";

const useVerifySeller = (email) => {
  const {
    data: verification,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://b612-used-products-resale-server-side-shariyer.vercel.app/users/allsellers/${email}`
        );
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  return [verification, isLoading, refetch];
};

export default useVerifySeller;
