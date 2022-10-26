import React from 'react'
function ErrorPage (error) {
    const message = typeof(error.response.data) == "string" && error.response.data.lenght > 0 ? error.response.data : error.response.statusText 
    const httpStatus = error.response.status
    return <h1>ERROR {httpStatus}: {message}</h1>
}
export default ErrorPage;