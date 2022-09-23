import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

export function ShowFixedAsset() {
    const { fixedAssetId } = useParams()
    const [fixedAsset, setFixedAsset] = React.useState(null)
    useEffect(() => {
        axios
            .get(
                `https://ncv-api.herokuapp.com/api/fixedAssets/${fixedAssetId}`
            )
            .then((response) => {
                setFixedAsset(response.data)
                console.log(response.data)
            })
    }, [])

    if (!fixedAsset) return null

    return (
        <div>
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
                                src="https://comovertodogratis.com/wp-content/uploads/2021/05/1621943166_La-computadora-portatil-Teclast-F15-hoy-a-un-precio-increible-2048x1280.jpg"
                            />
                            <CardContent>
                                <h4>DESCRIPCIÓN: {fixedAsset.description}</h4>{' '}
                                <br></br>
                                <h4>
                                    FECHA DE ENTRADA:{' '}
                                    {fixedAsset.entryDate.split('T')[0]}
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
        </div>
    )
}
