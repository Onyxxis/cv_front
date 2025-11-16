import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cv-backend-8ize.onrender.com",
  // http://127.0.0.1:8000
  // https://cv-backend-8ize.onrender.com
  
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
