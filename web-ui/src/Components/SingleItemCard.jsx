/*START NEW SINGLE ITEM CARD HERE*/ 
/*Creo que vamos a necesitar una lista, porque no todos tienen la misma cantidad de datos*/
import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'


const SingleItemCard = ({element, displayed}) => {
    let imageUrl = "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    let detailsElement = []
      for (const prop in element ){
        if (prop != "id" ){
            detailsElement.push(
                <div>
                    <h4>{prop}:  {element[prop]}</h4><br></br>
                </div>
            )
        }
      } 

    return(
        <div>
                <Card sx={{ p: 5, maxWidth: 1300, display: {displayed}}}>
                        <Box sx={{ display: 'inline-block' }} >
                        <CardMedia
                            component="img"
                            image={ imageUrl}
                            sx={{ width: 400 }}
                        ></CardMedia>
                        </Box>
                        <Box
                            sx={{
                                display: 'inline-block',
                                right: '30%'
                            }}
                        >
                            <CardContent>
                                {detailsElement}
                            </CardContent>
                        </Box>
                </Card>
        </div>
    )
}

export default SingleItemCard
