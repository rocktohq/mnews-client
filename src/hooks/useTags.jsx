import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTags = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tags");
      return res.data;
    },
  });

  const tagsManager = [];

  tags.map((tag) => tagsManager.push({ value: tag.name, label: tag.name }));

  return { tagsManager };
};

export default useTags;
