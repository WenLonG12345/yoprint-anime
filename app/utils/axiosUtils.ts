import Axios, { type AxiosError } from "axios";
import type { AxiosResponse } from "axios";

const { VITE_API_DOMAIN, VITE_API_KEY } = import.meta.env;

const axiosUtils = Axios.create({
  baseURL: VITE_API_DOMAIN,
  // headers: {
  //   "X-API-KEY": VITE_API_KEY,
  // },
});

// // Bearer Token Interceptors
// axiosUtils.interceptors.request.use(async (config: any) => {
//   const token = useAuthStore.getState()?.auth?.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axiosUtils.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // if (typeof window !== "undefined") {
    //   if (response.data.code === -2) {
    //     const setLogout = useAuthStore.getState().setLogout;
    //     setLogout();
    //   }
    // }
    return response.data;
  },
  // async (error: AxiosError): Promise<AxiosError | AxiosResponse> => {
  //   const prevRequest = error.config;

  //   if (error.response) {
  //     if (error.response.status === 401) {
  //       const setLogout = useAuthStore.getState().setLogout;
  //       setLogout();
  //       redirect({
  //         to: "/login",
  //       });
  //       return Promise.reject({
  //         code: 401,
  //         msg: "Session Expired. Please login again.",
  //       });
  //     }
  //   }

  //   return Promise.reject(error.response?.data);
  // }
);

export default axiosUtils;
