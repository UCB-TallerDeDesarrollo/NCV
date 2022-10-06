/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'
import ListContainer from "../../Components/ListContainer"
import ListBasic from '../../Components/ListBasic'
import ButtonPrimary from '../../Components/MUI-Button';    
import { useNavigate } from 'react-router-dom';

export default function ShowFixedAssets() {
    const navigate = useNavigate();
    const completeInfoFixedAsset = '/activos-fijos'
    const [url, setSomeUrl] = useState('https://ncv-api.herokuapp.com/api/fixedAssets')
    const { apiData:fixedAssets, error } = getFromApi(url)
    if(error){
        return ErrorPage(error)
    }
    //fixedAsset.entryDate!=null? fixedAsset.entryDate.split('T')[0]:null
    if (!fixedAssets) return null
    if (fixedAssets.length>0){
        const listElements = fixedAssets.map((el)=>{
            return {
                id:el.id, 
                title:`${el.name}`, 
                description:`Descripción: ${el.description!=null ? el.description:"*Sin descripción*"}`, 
                elementUrl:`${completeInfoFixedAsset}/${el.id}`,
                imgSrc:`https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`
            }
        })
        let fixedAssetsComponent = <ListBasic items={listElements} />
        let nexFixedAsset = "/crear-activo-fijo"
        const listHeaderComponents = <ButtonPrimary label={"Crear activo fijo"} onClick={()=>navigate(nexFixedAsset)}/>
        return (
            <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                <ListContainer title="Lista de activos fijos" header={listHeaderComponents}>
                    {fixedAssetsComponent}
                </ListContainer>
            </Box></>
        )
    }
}
