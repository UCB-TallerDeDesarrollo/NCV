import React from 'react'
import { TextField } from '@mui/material'

function InputText(props) {
    //console.log(props.sx)
    let sx = props.sx ? props.sx : {}
    const { label, multiline, ...rest } = props
    sx.width = sx.width == undefined ? 1 : sx.width;
    sx.margin = sx.margin == undefined ? 2 : sx.margin;
    console.log(sx);
    return (
        <TextField multiline={multiline} label={label} variant="standard" {...rest} sx={sx}/>
    )
}

export default InputText
