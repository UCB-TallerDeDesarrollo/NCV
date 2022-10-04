/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'

export default function ShowFixedAssets() {
    const completeInfoFixedAsset = '/activos-fijos'
    const [url, setSomeUrl] = useState('https://ncv-api.herokuapp.com/api/fixedAssets')
    const { apiData:fixedAssets, error } = getFromApi(url)
    if(error){
        return ErrorPage(error)
    }

    if (!fixedAssets) return null
    const listElements = fixedAssets.map((el)=>{
        return {
            id:el.id, 
            title:`${el.name}`, 
            description:`Descripción: ${el.description}`, 
            elementUrl:`${completeInfoFixedAsset}/${el.id}`,
            //imgSrc:`https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`
        }
    })
    
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
        </Box></>
    )
}