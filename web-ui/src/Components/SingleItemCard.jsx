import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2';

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

// pendiente por probar
function GridItems({elements , size_md=4}){
    let gridElements = []
    for (const prop in elements ){
        var contentOneElement = elements[prop]
        if (elements[prop] == null  || elements[prop]== ""){
            contentOneElement =  " ----- "
        }
        gridElements.push(
            <>
            <Grid item xs={12} sm={6} md={size_md}>
                <div>
                    <font size="2">{prop}</font> </div>
                <div >
                    <h5 style={styles.label}>{contentOneElement}</h5>
                    <p></p>
                </div>
            </Grid>
            </> 
        )
  }
  return gridElements;
}

const SingleItemCard = ({title="" , element, imageUrl = "none" , imageCirle=true}) => {
    let detailsElement = []
    const styles = {
        label: {
          display:"inline"
        }
      }
      for (const prop in element ){
            var contentOneElement = element[prop]
            if (element[prop] == null  || element[prop]== ""){
                contentOneElement =  " ----- "
            }
            detailsElement.push(
                <>
                    <div>
                        <font size="2">{prop}</font> </div>
                    <div >
                        <h5 style={styles.label}>{contentOneElement}</h5>
                        <p></p>
                    </div>
                </> 
            )
      }
      
    let contentCard = []
    if (imageUrl != "none"){
        contentCard.push( <Box sx={{ display: 'inline-block' , width: 260 , height:{md:70, sm:220} }} >
                            <MyCardImage imageUrl={imageUrl} imageCirle={imageCirle}></MyCardImage>
                            </Box>)

        contentCard.push( <Box sx={{ display: 'inline-block', width: {sm:200 , md:450}}}>
                            <h2>{title}</h2><br></br>
                            <Grid container spacing={0} rowSpacing={1}>
                            {detailsElement.map((n,i)=>{
                                    return (
                                        <Grid item key={i} xs={12} sm={6} md={4}>
                                            {detailsElement[i]}
                                        </Grid>
                                    )})}
                            </Grid>
                            </Box>)

    }else{
        // Card for health Report
        contentCard.push( 
                    <Box sx={{ display: 'inline-block', width: {sm:550 , md:1500}}}>
                            <h2>{title}</h2><br></br>
                            <Grid container spacing={1.5} rowSpacing={0}>
                            {detailsElement.map((n,i)=>{
                                    return (
                                        <Grid item key={i} xs={12} sm={6} md={7}>
                                            {detailsElement[i]}
                                        </Grid>
                                    )})}
                            </Grid>
                    </Box>)
    }

    if( contentCard.length==2){
        return (
            <Card sx={{ p: 5, maxWidth: 1000, m:2, minWidth:{md:1000} , borderRadius:3}}>
                {contentCard[0]}
                {contentCard[1]}
            </Card>
        )
    }else{
        return (
            <Card sx={{ p: 5, maxWidth: 1000, m:2, minWidth:{md:1000} , borderRadius:3}}>
                {contentCard[0]}
            </Card>
        )
    }
}

export default SingleItemCard
