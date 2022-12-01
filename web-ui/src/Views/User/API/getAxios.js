import axios from "axios";

export const api = axios.create({
    baseURL: "https://ncv-api.azurewebsites.net/api/kids"
})

export const getListUsers = async () => {
    const response = await api.get('/api/auth')
    return response.data
}
