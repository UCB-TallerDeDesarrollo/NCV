import React from 'react'
import { TextField } from '@mui/material'

function InputText(props) {
    const { label, ...rest } = props

    return (
        <>
            <TextField label={label} variant="filled" {...rest} />
        </>
    )
}

export default InputText
