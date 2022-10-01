import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

const SingleItemCard = ({element}) => {
    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
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
                            direction="column" justifyContent="center"
                            sx={{ width: 400, height:400, borderRadius:50}}
                        >
                        </CardMedia>
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
