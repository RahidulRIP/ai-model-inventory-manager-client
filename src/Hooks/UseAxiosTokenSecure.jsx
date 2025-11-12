import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/Context/AuthContext";

const axiosTokenSecure = axios.create({
  baseURL: "http://localhost:7000",
});

const UseAxiosTokenSecure = () => {
  const { user, signUserOut } = useContext(AuthContext);

  useEffect(() => {
    // request interceptors
    const requestInterceptor = axiosTokenSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // response interceptors
    const responseInterceptor = axiosTokenSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error, "error inside the interceptor");
        const status = error.status;
        if (status === 401 || status === 403) {
          signUserOut();
        }
      }
    );

    return () => {
      axiosTokenSecure.interceptors.request.eject(requestInterceptor);
      axiosTokenSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signUserOut]);

  return axiosTokenSecure;
};

export default UseAxiosTokenSecure;
