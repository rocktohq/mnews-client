import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://mnews-server.vercel.app/api",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
