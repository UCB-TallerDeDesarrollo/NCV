import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import getFromApi from '../../Components/GetFromApi'
import ErrorPage from '../../Components/ErrorPage'
import Navbar from '../../Components/NavBar'
import SingleItemCard from '../../Components/SingleItemCard'
import BoxWithButton from '../../Components/BoxWithButton'

export function ShowFixedAsset() {
    const { fixedAssetId } = useParams()
    const url = `https://ncv-api.herokuapp.com/api/fixedAssets/${fixedAssetId}`
    const { apiData:fixedAsset, error } = getFromApi(url)
    let imageUrl = "https://comovertodogratis.com/wp-content/uploads/2021/05/1621943166_La-computadora-portatil-Teclast-F15-hoy-a-un-precio-increible-2048x1280.jpg" 
        
    if(error){
        return ErrorPage(error)
    }
    if (!fixedAsset) return null
    const fixedAssetData = { 
        "NOMBRE": fixedAsset.name,
        "DESCRIPCIÓN" : fixedAsset.description,
        "FECHA DE ENTRADA": fixedAsset.entryDate!=null? fixedAsset.entryDate.split('T')[0]:null,
        "PRECIO" : fixedAsset.price, 
        "CARACTERÍSTICAS":fixedAsset.features,
        "CANTIDAD" : fixedAsset.quantity
    }
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '11vh' }}>
                <SingleItemCard element={fixedAssetData} imageUrl={imageUrl} imageCirle={false} />        
            </div>
        </>
        )
}