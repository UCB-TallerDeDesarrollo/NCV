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
    let imageUrl = "https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg" 
        
    if(error){
        return ErrorPage(error)
    }
    if (!fixedAsset) return null
    const fixedAssetData = {
        "FECHA DE ENTRADA": fixedAsset.entryDate!=null? fixedAsset.entryDate.split('T')[0]:null,
        "DESCRIPCIÓN" : fixedAsset.description,
        "PRECIO" : fixedAsset.price, 
        "CARACTERÍSTICAS":fixedAsset.features,
        "CANTIDAD" : fixedAsset.quantity,        
    }
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <SingleItemCard title={fixedAsset.name} secondaryField={fixedAsset.programHouseName} element={fixedAssetData} imageUrl={imageUrl} imageCirle={false} />        
            </div>
        </>
        )
}