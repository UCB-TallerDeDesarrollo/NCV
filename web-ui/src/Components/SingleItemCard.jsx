/*START NEW SINGLE ITEM CARD HERE*/ 
/*Creo que vamos a necesitar una lista, porque no todos tienen la misma cantidad de datos*/
import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

const SingleItemCard = ({element}) => {
    /*return (
        <Card sx={{ maxWidth: 600 }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Picture"
                        src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                    />
                }
                
                title={element.Title}
                subheader={element.description}
            />
            <CardContent>
            for (var prop in element){
                <div>
                    <h2>"Key:" + {prop}  </h2>
                    <h2>"Value:" {element[prop]}</h2>
                </div>
            }
            </CardContent>
        </Card>
    )*/
    return(
        /*<Grid id="element" class="element" style={{ minHeight: '60vh' }}>
            <Card sx={{ p: 2, maxWidth: 1300 }} key={element.id}>
                <Box sx={{ display: 'flex' }}>
                    <CardHeader id="Name" title="Hola" />
                </Box>
                <Box sx={{ display: 'inline-block' }}>
                    <Avatar alt="Picture" src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg" sx={{ width: 400 }} />
                </Box>
                <Box sx={{ display: 'inline-block',position: 'absolute',right: '30%'}}>
                    <CardContent>
                        <h4> Descripción: {element.ci}{' '}</h4>
                        <h4> Fecha de entrada: {element.birthDate.split('T')[0]}{' '}</h4>
                        <h4>Precio: {element.ci} </h4>
                        <br></br>
                    </CardContent>
                </Box>
            </Card>
        </Grid>*/

        /*<Card>
            <Box sx={{ display: 'inline-block' }}>
                    <Avatar
                        alt="Picture"
                        src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                    />
                <CardContent>
                    <h1>Hola</h1>
                    <h1>{element.firstName}</h1>
                </CardContent>
            </Box>
        </Card>*/

        <Card>
            <Box sx={{ display: 'inline-block' }}>
                <CardContent>
                    <h1>Hola</h1>
                    <h1>{element.firstName}</h1>
                </CardContent>
            </Box>
        </Card>
    )
}

export default SingleItemCard
