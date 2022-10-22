import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';

const SingleItemCard = ({title="" , element, imageUrl = "none" , imageCirle=true}) => {
    let detailsElement = []
    const styles = {
        label: {
          display:"inline"
        }
      }
      // <p size="50" >{contentOneElement}</p>
    let countAllNull = 0;
      for (const prop in element ){
        if (prop != "id" ){
            var contentOneElement = element[prop]
            if (element[prop] == null  || element[prop]== ""){
                countAllNull++;
                contentOneElement =  " ----- "
            }
            detailsElement.push(
                <>
                <div>
                    <font size="2">{prop}</font>
                </div>
                <div >
                    <h5 style={styles.label}>{contentOneElement}</h5>
                    <p></p>
                </div>
                </> 
            )
        }
      }



    let contentCard = []
    if (imageUrl != "none"){
        if ( imageCirle== false ){
        contentCard.push( <div>
            <CardMedia
                component="img"
                image={ imageUrl}
                direction="column" justifycontent="center"
                sx={{ width: {xs:50, sm:40}, height:{xs:50, sm:40}, borderRadius:3     }}
            >
            </CardMedia>
        </div>)
        } else{
            contentCard.push( <div>
                <CardMedia
                    component="img"
                    image={ imageUrl}
                    direction="column" justifycontent="center"
                    sx={{ width: {xs:200, sm:200}, height:{xs:200, sm:200}, borderRadius:50     }}
                >
                </CardMedia>
            </div>)
        }
        contentCard.push( <div>
            <h2>{title}</h2><br></br>
            <CardContent>
                {detailsElement}
            </CardContent>
        </div>)

    }else{
        if(detailsElement.length %2 != 0 ){
            detailsElement.push(
                <div>
                    <h4></h4><br></br>
                </div>
            )
        }
            contentCard.push( <div>
                <h2>{title}</h2><br></br>
                <CardContent>
                    {detailsElement.slice(0, detailsElement.length/2  )}
                </CardContent>
            </div>)
            contentCard.push( <div>
                <CardContent>
                    {detailsElement.slice(detailsElement.length/2, detailsElement.length )}
                </CardContent>
            </div>)
    }
/*
    return(
        <div>
            <Grid container direction="column" alignItems="center" justify="center" >
                <Card sx={{ p: 5, maxWidth: 1000, m:2, minWidth:{md:1000} , borderRadius:3}}>
                    <Box sx={{ display: 'inline-block' , width: 450 }} >
                        {contentCard[0]}
                    </Box>

                    <Box sx={{ display: 'inline-block', right: '30%', width: 450}}>
                        {contentCard[1]}
                    </Box>
                </Card>
            </Grid>
        </div>
    )
*/
return(
    <div>
        <Grid container direction="column" alignItems="center" justify="center" >
            <Card sx={{ p: 5, maxWidth: 1000, m:2, minWidth:{md:1000} , borderRadius:3}}>
                <Box sx={{ display: 'inline-block' , width: 450 }} >
                    {contentCard[0]}
                </Box>

                <Box sx={{ display: 'inline-block', right: '30%', width: 450}}>
                <h2>{title}</h2><br></br>
                    <Grid container spacing={1.5} rowSpacing={0}>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[0]}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[1]}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[2]}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[3]}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[4]}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                            {detailsElement[5]}
                            </Grid>
                    </Grid>
                </Box>
            </Card>
        </Grid>
    </div>
)
    
}

export default SingleItemCard
