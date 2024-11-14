import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://rablo-backend.vercel.app",
//   baseURL: "https://rablo-backend-72m8.onrender.com",
});
export default axiosInstance;
