import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data,
    isPending: isPremiumLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "isPremium"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  return {
    isPremium: data?.isPremium,
    duration: data?.duration,
    startTime: data?.startTime,
    isPremiumLoading,
    refetch,
  };
};

export default usePremium;
