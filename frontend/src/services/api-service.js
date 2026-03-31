import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiService.interceptors.request.use(
    (config) => {
        config.withCredentials = true;

        return config;
    }
    ,
    (error) => {
        return Promise.reject(error);
    }
);