import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://al-model-inventory-manager-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosPublic;
};

export default useAxiosSecure;
