import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + ""
})

export const getListUsers = async () => {
    const response = await api.get('/api/auth')
    return response.data
}


export const getListEmails = async () => {
    const response = await api.get('/api/auth')
    const emails=[];
    for(var i=0; i<response.data.length; i++){
        emails.push(response.data[i].email)
    }
    return emails
}

