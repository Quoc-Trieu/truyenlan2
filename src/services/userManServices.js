import AxiosClient from "./axiosClient";

// ví dụ
const API_ENDPOINT = "user/"

export const getListUser = (params) => {
    return AxiosClient.get(API_ENDPOINT + `getAllUser`,{
        params: params
    })
}

export const getSales = (params) => {
    return AxiosClient.get(API_ENDPOINT + `sales` ,{
        params: {
            page: params.page,
            take: params.take,
            search: params.search,
            order: params.order
        }
    })
}

export const getDetailUser = (email) => {
    return AxiosClient.get(API_ENDPOINT + `one?email=${email}`)
}

export const imgCard = ({ filename, token }) => {
    return AxiosClient.get('user/image/' + filename + '&{token}?token=' + token)
}

export const historyTrading = (params) => {
    return AxiosClient.get(`trading/history/all?order=DESC&page=${params.page}&take=5&date=${params.date}&email=${params.email}`)
}
export const historyTran = (params) => {
    return AxiosClient.get(`transaction/history/all?order=DESC&page=${params.page}&take=6&email=${params.email}`)
}

export const lockeduser = (params) => {
    return AxiosClient.delete(`user/lockUser?email=${params.email}&userStatus=${params.userStatus}`)
}

export const lockedSale = (params) => {
    return AxiosClient.put(`manager/sale/lock?idSale=${params.idSale}&isLocked=${params.isLocked}`)
}

export const withdraw = (data) => {
    return AxiosClient.post(`transaction/manager/withdraw`, data)
}

export const deposit = (data) => {
    return AxiosClient.post(`transaction/manager/deposit`, data)
}
export const account = () => {
    return AxiosClient.get(API_ENDPOINT + `account`)
}
export const changePass = (pass) => {
    return AxiosClient.patch(API_ENDPOINT + `account?password=${pass}`)
}

export const addSale =(data) =>{
    return AxiosClient.post(API_ENDPOINT + `sale`, data)
}
// lịch sử nạp 
export const historyNap = () => {
    return AxiosClient.get('transaction/manager/bank')
}
export const historyNapUpdate = (data) => {
    return AxiosClient.post('transaction/manager/bank', data)
}
export const getListDeposit = (param) => {
    if (param) {

        return AxiosClient.get(`transaction/manager/history-deposit?search=${param}`)
    } else {
        return AxiosClient.get(`transaction/manager/history-deposit`)
    }
}
// change password
export const ChangePassWord = (data) => {
    return AxiosClient.post('user/forgot-password-admin', data)
}