import AxiosClient from "./axiosClient";

const API_ENDPOINT = "story/";

export const getList = (param) => {
    return AxiosClient.get(API_ENDPOINT + 'getAllStory', {
        params: param
    })
}

export const getComments = (param) => {
    return AxiosClient.get('/comment/getAllComment', {
        params: param
    })
}

export const getBaiviet = (param) => {
    return AxiosClient.get('story/getMyStory', {
        params: param
    })
}

export const addCmt = (id) => {
    return AxiosClient.put('/comment/browseComments?idComment=' + id)
}

export const getinfoStory = (id) => {
    return AxiosClient.get(API_ENDPOINT + 'getStory', {
        params: { idStory: id }
    })
}

export const getchapter = (id) => {
    return AxiosClient.get('chapter/' + id)
}

export const getchapterPrev = (id) => {
    return AxiosClient.get('chapter/prev/' + id)
}

export const getchapterNext = (id) => {
    return AxiosClient.get('chapter/next/' + id)
}

export const createCmt = (data) => {
    return AxiosClient.post('comment/createComment', data)
}