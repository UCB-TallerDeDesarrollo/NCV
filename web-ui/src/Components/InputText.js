import React from 'react'
import { TextField, Input, InputLabel, FormControl } from '@mui/material'
import { width } from '@mui/system';

function InputText(props) {
    let sx = props.sx ? props.sx : {}
    const { label, multiline, ...rest } = props
    sx.width = sx.width == undefined ? 1 : sx.width;
    sx.margin = sx.margin == undefined ? 2 : sx.margin;
    return (
        <TextField multiline={multiline} label={label} variant="standard" {...rest} sx={sx}/>
    )
}

export default InputText

function InputPassword(props){
    const { label, id, ...rest } = props

    return (
        <FormControl>
            <InputLabel htmlFor={id} sx={{marginLeft: 2}}>{label}</InputLabel>
            <Input  id={id} variant="standard" {...rest} sx={{marginLeft: 4, width: 244}}/>
        </FormControl>
        
    );
}

export {InputPassword}