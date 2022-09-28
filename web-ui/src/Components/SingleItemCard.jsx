/*START NEW SINGLE ITEM CARD HERE*/ 
/*Creo que vamos a necesitar una lista, porque no todos tienen la misma cantidad de datos*/
import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

const SingleItemCard = ({about}) => {
    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Profile Picture"
                        src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
                    />
                }
                title={about.Name}
                subheader={about.description}
            />
            <CardContent>
                /*AQUI LISTAR EL RESTO DE INFORMACION DEPENDE DE LA LISTA*/
            </CardContent>
        </Card>
    )
}

export default SingleItemCard
