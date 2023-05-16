import AxiosClient from "./axiosClient";

const API_ENDPOINT = 'time-config/';

export const getTimeConfig = () => {
    return AxiosClient.get(API_ENDPOINT + 'info')
}

export const createTimeConfig = (data) => {
    return AxiosClient.post(API_ENDPOINT + 'create', data)
}
export const deleteTimeConfig = (id) => {
    return AxiosClient.delete(API_ENDPOINT + `delete?id=${id}`)
}