import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken;

    if (typeof config.headers.Authorization === "string") {
      accessToken = config.headers.Authorization.split(" ")?.[1];
    }

    config.headers.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : undefined;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
