import React from 'react'
function ErrorPage (error) {
    console.log(error)
    const message = error.response.data
    const httpStatus = error.response.status
    return <h1>ERROR {httpStatus}: {message}</h1>
}
export default ErrorPage;
