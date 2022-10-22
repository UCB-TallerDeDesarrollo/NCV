/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'
import ListContainer from "../../Components/ListContainer"
import ListBasic from '../../Components/ListBasic'
import ButtonPrimary from '../../Components/MUI-Button';    
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useNavigate, useLocation } from 'react-router-dom';

export default function ShowFixedAssets() {
    const location = useLocation()
    const navigate = useNavigate();
    const completeInfoFixedAsset = '/activos-fijos'
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);
    const { apiData:fixedAssets, error } = getFromApi(url)
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    if(error){
        return ErrorPage(error)
    }
    if (!fixedAssets) return null
    if (fixedAssets.length>0){
        const listElements = fixedAssets.map((el)=>{
            return {
                id:el.id, 
                title:`${el.name}`, 
                description:`Descripción: ${el.description!=null && el.description!='' ? el.description:"*Sin descripción*"} -- Programa: ${el.programHouseName!=null&&el.programHouseName!=""&&el.programHouseName!=undefined?el.programHouseName:"*Sin programa*"}`,                 
                elementUrl:`${completeInfoFixedAsset}/${el.id}`,
                imgSrc:`https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`                
            }
        })
        let fixedAssetsComponent = <ListBasic items={listElements} withImage={false} />
        let nexFixedAsset = "/crear-activo-fijo"
        const listHeaderComponents = <ButtonPrimary label={"Crear activo fijo"} onClick={()=>navigate(nexFixedAsset)}/>
        return (
            <>
                <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                    <ListContainer title="Lista de activos fijos" header={listHeaderComponents}>
                        {fixedAssetsComponent}
                    </ListContainer>
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
