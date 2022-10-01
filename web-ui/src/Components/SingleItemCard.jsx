import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';
import { minWidth } from '@mui/system'

const SingleItemCard = ({title , element, imageUrl = "none"}) => {
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
    let contentCard = <div></div>
    if (imageUrl != "none"){
        contentCard= <div>
            <Box sx={{ display: 'inline-block' , width: 450 }} >
                                <CardMedia
                                    component="img"
                                    image={ imageUrl}
                                    direction="column" justifyContent="center"
                                    sx={{ width: {xs:250, sm:400}, height:{xs:250, sm:400}, borderRadius:50}}
                                >
                                </CardMedia>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        right: '30%',
                                        width: 450
                                    }}
                                >
                                    <CardContent>
                                        {detailsElement}
                                    </CardContent>
                                </Box>
        </div>
    }else{
        contentCard = <div>
            <h1> {title} </h1><br></br>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    right: '30%',
                                    width: 450
                                }}
                            >
                                <CardContent>
                                    {detailsElement.slice(0, detailsElement.length/2  + 1)}
                                </CardContent>
                            </Box>

                            <Box
                                sx={{
                                    display: 'inline-block',
                                    right: '30%',
                                    width: 450,
                                    
                                }}
                            >
                                <CardContent>
                                    {detailsElement.slice(detailsElement.length/2  + 1, detailsElement.length )}
                                </CardContent>
                            </Box>
        </div>

    }

    return(
        <div>
            <Grid container direction="column" alignItems="center" justify="center" >
                <Card sx={{ p: 5, maxWidth: 1000, m:2, minWidth:{md:1000}}}>
                        {contentCard}
                </Card>
            </Grid>
        </div>
    )

    
}

export default SingleItemCard
