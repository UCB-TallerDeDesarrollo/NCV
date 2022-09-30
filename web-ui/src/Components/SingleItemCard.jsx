/*START NEW SINGLE ITEM CARD HERE*/ 
/*Creo que vamos a necesitar una lista, porque no todos tienen la misma cantidad de datos*/
import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';


const SingleItemCard = ({element}) => {
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
            <Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh'}}>
                <Card sx={{ p: 5, maxWidth: 1300, m:5}}>
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
            </Grid>
        </div>
    )
}

export default SingleItemCard
