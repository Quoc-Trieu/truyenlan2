import AxiosClient from "./axiosClient";

const API_ENDPOINT = "user/refresh-tokens";

export const refeshToken = () => {
    return AxiosClient.get(API_ENDPOINT);
}