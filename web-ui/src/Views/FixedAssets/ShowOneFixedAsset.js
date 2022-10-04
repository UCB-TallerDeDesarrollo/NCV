import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import getFromApi from '../../Components/GetFromApi'
import ErrorPage from '../../Components/ErrorPage'
import Navbar from '../../Components/NavBar'
export function ShowFixedAsset() {
    const { fixedAssetId } = useParams()
    const [url, setSomeUrl] = useState(`https://ncv-api.herokuapp.com/api/fixedAssets/${fixedAssetId}`)
    const { apiData:fixedAsset, error } = getFromApi(url)

    if(error){
        return ErrorPage(error)
    }
    if (!fixedAsset) return null
    return (
        <><Navbar /><div style={{ marginTop: '10vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                </Toolbar>
            </AppBar>
            <div>
                <ul>
                    <Card style={{ minHeight: '80vh' }}>
                        <li>
                            <CardHeader title={fixedAsset.name} />
                            <Box
                                component="img"
                                sx={{
                                    height: 533,
                                    width: 750,
                                    maxHeight: { xs: 733, md: 567 },
                                    maxWidth: { xs: 750, md: 750 }
                                }}
                                alt="Activo fijo."
                                src="https://comovertodogratis.com/wp-content/uploads/2021/05/1621943166_La-computadora-portatil-Teclast-F15-hoy-a-un-precio-increible-2048x1280.jpg" />
                            <CardContent>
                                <h4>DESCRIPCIÓN: {fixedAsset.description}</h4>{' '}
                                <br></br>
                                <h4>
                                    FECHA DE ENTRADA:{' '}
                                    {fixedAsset.entryDate!=null? fixedAsset.entryDate.split('T')[0]:null}
                                </h4>
                                <br></br>
                                <h4>PRECIO: {fixedAsset.price}</h4>
                                <br></br>
                                <h4>CARACTERÍSTICAS: {fixedAsset.features}</h4>
                                <br></br>
                                <h4>CANTIDAD: {fixedAsset.quantity}</h4>
                                <br></br>
                            </CardContent>
                        </li>
                    </Card>
                </ul>
            </div>
        </div></>
    )
}
