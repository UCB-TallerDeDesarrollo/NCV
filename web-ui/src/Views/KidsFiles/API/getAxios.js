import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + ""
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
export const getKidEducationReport = async (id) => {
    const url = 'api/kids/'+ id +'/educationreports'
    const response = await api.get(url)
    return response.data
}
export const getKidFamilyReport = async (id) => {
    const url = 'api/kids/'+ id +'/familyreports'
    const response = await api.get(url)
    return response.data
}
export const getKidLegalReport = async (id) => {
    const url = 'api/kids/'+ id +'/legalreports'
    const response = await api.get(url)
    return response.data
}
export const getKidFoundationReport = async (id) => {
    const url = 'api/kids/'+ id +'/foundationreports'
    const response = await api.get(url)
    return response.data
}

export const getOneKid = async (kidId) => {
    const response = await api.get('/api/kids/'+ kidId )
    return response.data
}

export const editKidFile = async (kidId) => {
    const response = await api.put('/api/kids/'+ kidId )
    return response.data
}

