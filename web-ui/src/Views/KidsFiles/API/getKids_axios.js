import axios from "axios";

export const api = axios.create({
    baseURL: "https://ncv-api.herokuapp.com"
})

export const getListKids = async () => {
    const response = await api.get('/api/kids')
    return response.data
}