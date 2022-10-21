import axios from "axios";

export const api = axios.create({
    baseURL: "https://ncv-api.herokuapp.com"
})

export const getListKids = async () => {
    const response = await api.get('/api/kids')
    return response.data
}

export const getKidBasicInfo = async (id) => {
    const url = 'api/kids/'+ id
    const response = await api.get(url)
    return response.data
}

export const getKidHealthReport = async (id) => {
    const url = 'api/kids/'+ id +'/healthreports'
    const response = await api.get(url)
    return response.data
}
