import PropTypes from "prop-types";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
const imgbbApiUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const useImageUpload = ({ image }) => {
  const axiosPublic = useAxiosPublic();

  const { data: imageRes = {}, isLoading: imageUploadLoading } = useQuery({
    queryKey: ["imageRes"],
    queryFn: async () => {
      const res = await axiosPublic.get(imgbbApiUrl, image, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });

  return { imageRes, imageUploadLoading };
};

export default useImageUpload;
useImageUpload.propTypes = {
  image: PropTypes.node.isRequired,
};
