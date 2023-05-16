import AxiosClient from "./axiosClient";

const API_ENDPOINT = 'trading-config/';

export const getTradingConfig = () => {
    return AxiosClient.get(API_ENDPOINT + 'info')
}

export const updateTradingConfig = (data) => {
    return AxiosClient.post(API_ENDPOINT + 'update',data)
}