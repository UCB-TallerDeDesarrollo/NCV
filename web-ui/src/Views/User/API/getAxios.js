import axios from "axios";

export const api = axios.create({
    baseURL: "https://ncv-api.herokuapp.com"
})

export const getListUsers = async () => {
    const response = await api.get('/api/auth')
    console.log(response.data)
    return response.data
}
