import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../../Components/ErrorPage'
import getFromApi from '../../../Components/GetFromApi'
import Navbar from '../../../Components/NavBar'
import ListContainer from '../../../Components/ListContainer'
import ButtonPrimary from '../../../Components/MUI-Button'  

import ListGrid from '../../../Components/ListGrid'
import { useNavigate } from 'react-router-dom'

export default function ShowFixedAssets() {
    const navigate = useNavigate();
    const urlAssetStates = 'https://ncv-api.herokuapp.com/api/assetStates/'
    const { apiData: assetStates, error: errorAssetStates } = getFromApi(urlAssetStates) 
    let assetStatesComponent = null       
    if (errorAssetStates) return ErrorPage(errorAssetStates)
    if (!assetStates) return null
    const assetStatesListElements = assetStates.map((assetState)=>{
        return {
            id:assetState.id, 
            title: assetState.state,     
            description: ''       
        }
    })
    assetStatesComponent = <ListGrid items={assetStatesListElements} withImage={false} withDeleteIcon={true}  withEditIcon={true} />
    let createStateFixedAssetView = "/crear-estado-activo-fijo"
    /*if (withDeleteIcon){
        deleteIcon = 
        <IconButton aria-label="delete" className={"delete-assetState-button"}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      }
      if (withEditIcon){
        editIcon = 
        <IconButton aria-label="delete" className={"delete-assetState-button"}>
          <EditIcon fontSize="large" />
        </IconButton>
      }*/
    const listHeaderComponents = 
    <>
        <ButtonPrimary label={"Crear estado"} onClick={()=>navigate(createStateFixedAssetView)}/>
    </>
    return (
        <>
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                <ListContainer title="Lista de Estados de Activos Fijos" header={listHeaderComponents}>
                    {assetStatesComponent}
                </ListContainer>
            </Box>
        </>
    )
}