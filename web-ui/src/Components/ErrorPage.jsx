import React from 'react'
function ErrorPage (error) {
    const message = error.response.data != ""? error.response.data : error.response.statusText 
    const httpStatus = error.response.status
    return <h1>ERROR {httpStatus}: {message}</h1>
}
export default ErrorPage;