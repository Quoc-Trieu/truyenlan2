import AxiosClient from "./axiosClient";

const API_ENDPOINT = "auth/";

export const login = (data) => {
    return AxiosClient.post(API_ENDPOINT + 'login', data)
}

export const getuser = () => {
    return AxiosClient.get('/user/info')
}

export const getAdmin = () => {
    return AxiosClient.get(API_ENDPOINT + 'account')
}

export const Axiosregister = (data) => {
    return AxiosClient.post('user/createUser', data)
}