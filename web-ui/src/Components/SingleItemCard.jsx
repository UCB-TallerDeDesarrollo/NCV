/*START NEW SINGLE ITEM CARD HERE*/ 
/*Creo que vamos a necesitar una lista, porque no todos tienen la misma cantidad de datos*/
import React from 'react'
import Card from '@mui/material/Card'
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

        <div></div>

        /*<div>
            <h1>{element.firstName}</h1>
            {element.map(element => <h5 key={element.id} name={element.firstname} />)}
        </div>*/
    )
}

export default SingleItemCard
