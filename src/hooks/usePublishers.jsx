import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });
  return { publishers, refetch };
};

export default usePublishers;
