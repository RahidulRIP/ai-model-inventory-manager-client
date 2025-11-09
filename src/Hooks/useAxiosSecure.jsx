import axios from "axios";

const axiosPublic = axios.create({ baseURL: "http://localhost:7000" });

const useAxiosSecure = () => {
  return axiosPublic;
};

export default useAxiosSecure;
