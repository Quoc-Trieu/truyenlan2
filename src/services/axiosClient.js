import axios from "axios";
import { stringify, parse } from "qs";
import { getToken } from "../utils/localStorage";
export const API_ENDPOINT = "http://45.76.145.5:3008/"; 

const AxiosClient = axios.create({
    baseURL: API_ENDPOINT,
    responseType: "json",
    timeout: 50000,
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
});

AxiosClient.interceptors.request.use(
    async (config) => {
        const newConfig = config;
        if (getToken()) {
            newConfig.headers.Authorization = `Bearer ${getToken()}`;
        }
        return newConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosClient;