import axios from "axios";
const axiosInstance = axios.create({
    // baseURL: "http://localhost:8000",
    //baseURL: "https://rablo-backend.vercel.app",
   baseURL: "https://rablo-backend-five.vercel.app",
});
export default axiosInstance;
