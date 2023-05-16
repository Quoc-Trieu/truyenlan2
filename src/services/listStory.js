import AxiosClient from "./axiosClient";

const API_ENDPOINT = "story/";

export const getList = (param) => {
    return AxiosClient.get(API_ENDPOINT + 'getAllStory', {
        params: param
    })
}

export const getinfoStory = (id) => {
    return AxiosClient.get(API_ENDPOINT + 'getStory', {
        params: { idStory: id }
    })
}

export const getchapter = (id) => {
    return AxiosClient.get('chapter/' + id)
}

export const createCmt = (data) => {
    return AxiosClient.post('comment/createComment',data)
}