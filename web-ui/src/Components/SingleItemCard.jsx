import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

function MyCardImage({imageUrl,imageCirle}){
    var borderRadiusValue = 3
    if (imageCirle){
        borderRadiusValue = 50
    }
    return <CardMedia
                    component="img"
                    image={ imageUrl}
                    direction="column" justifycontent="center"
                    sx={{ width: {xs:200, sm:200}, height:{xs:200, sm:200}, borderRadius:borderRadiusValue }}
                >
            </CardMedia>
}

function gridItems(elements){
    const styles = {
        label: {
          display:"inline"
        }
    }

    let gridElements = []
    for (const prop in elements ){
        var contentOneElement = elements[prop]
        if (elements[prop] == null){
            contentOneElement =  " ----- "
        }
        gridElements.push(
            <>
                <div>
                  <Typography variant="subtitle2" sx={styles.secondaryField}>{prop}</Typography>
                </div>
                <div>
                    <Typography variant="body1" sx={{display:'inline'}}>{contentOneElement}</Typography>
                <p></p>
              </div>
            </> 
        )
    }
    return gridElements
  }

const SingleItemCard = ({title="" , element, imageUrl = null , imageCirle=true, secondaryField=null}) => {   
    const styles = {
        secondaryField:{
            color:"#5BCCD9",
            display:"inline",            
        },
        title:{
            display:"inline"
        }
    }
    let sm_value_box = 200
    let md_value_box = 450
    let md_value_griItem = 4
    let contentCard = []
    if (imageUrl != null){
        contentCard.push( <Box sx={{ width: 260 , height:{md:70, sm:220} }} >
                            <MyCardImage imageUrl={imageUrl} imageCirle={imageCirle}></MyCardImage>
                            </Box>)

    }else{
        // To modify the space of grid: ex -> Card for health Report
        sm_value_box = 550
        md_value_box = 1500
        md_value_griItem = 7
    }

    let detailsElement = gridItems(element)
    contentCard.push( 
                <Box sx={{ width: {sm:sm_value_box , md:md_value_box}}}>
                        <Typography variant="h2" sx={{marginBottom:1.5}}>{title}</Typography>
                        <h4 style={styles.secondaryField}>{secondaryField}</h4>
                        <Grid container spacing={1.5} rowSpacing={0}>
                        {detailsElement.map((oneDetail,i)=>{
                                return (
                                    <Grid item key={i} xs={12} sm={6} md={md_value_griItem}>
                                        {oneDetail}
                                    </Grid>
                                )})}
                        </Grid>
                </Box>)

   return (
            <Card sx={{ p: 5 , pt: 4, maxWidth: 1000, m:2, minWidth:{md:1000} , borderRadius:3}}>
                {contentCard.map((oneContent,i)=>{
                        return (
                            <Box key={i} sx={{ display: 'inline-block'}}>
                                {oneContent}
                            </Box>
                        )})}
            </Card>
   )
}

export default SingleItemCard
