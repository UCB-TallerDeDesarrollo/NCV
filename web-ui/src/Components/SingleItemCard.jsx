import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

function MyCardImage({imageUrl,imageCirle,width=150,height=150}){
    var borderRadiusValue = 3
    if (imageCirle){
        borderRadiusValue = 50
    }
    return <CardMedia
                    component="img"
                    image={ imageUrl}
                    sx={{ width:width , height:height, borderRadius:borderRadiusValue, mr:{md:5}, mb:{xs:5,sm:5, md:0} }}
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
    //NEW IDEA: if prop == 'with' -> <Box key={i} sx={{mr:5, width:width}}>
    for (const prop in elements ){
        var contentOneElement = elements[prop]
        if (elements[prop] == null){
            contentOneElement =  " "
        }
        gridElements.push(
            <>
                <div>
                    <Typography noWrap variant="subtitle2" sx={styles.secondaryField}>{prop}</Typography>
                </div>
                <div>
                    <Typography variant="body1" >
                    {contentOneElement}    
                    </Typography>
                <p></p>
              </div>
            </> 
        )
    }
    return gridElements
  }

const SingleItemCard = ({title="" , element, imageUrl = null , imageCirle=true, secondaryField=null, imgWidth=150,imgHeight=150, itemsPerLine=false, button=null, sx={}}) => {   
    const styles = {
        secondaryField:{
            color:"#5BCCD9",
            display:"inline",            
        },
        title:{
            display:"inline"
        }
    }
    let flexGrow = null;
    if(itemsPerLine!=false){
        flexGrow = 1/itemsPerLine - 0.1;
    }
    let sm_value_box = 200
    let md_value_box = 450
    let md_value_griItem = 4
    let contentCard = []
    if (imageUrl != null){
        contentCard.push(<MyCardImage imageUrl={imageUrl} imageCirle={imageCirle} width={imgWidth} height={imgHeight}></MyCardImage>)

    }else{
        // To modify the space of grid: ex -> Card for health Report
        sm_value_box = 550
        md_value_box = 1500
        md_value_griItem = 7
    }

    let detailsElement = gridItems(element)
    contentCard.push( 
                <Box sx={{width:1}}>
                        <Typography variant="h2" sx={{marginBottom:1}}>{title}</Typography>
                        <Typography variant="h5" sx={{marginBottom:3}}>{secondaryField}</Typography>
                        <Box sx={{display:'flex', flexDirection:'row', flexWrap:'wrap', width:1}}>
                        {detailsElement.map((oneDetail,i)=>{
                                return (
                                    <Box key={i} sx={{mr:5, width:flexGrow}}>
                                        {oneDetail}
                                    </Box>
                                )})}
                        </Box>
                </Box>)
    let cardContentSx = {display:'flex', flexDirection:{sm:'column',md:'row', xs:'column'}, alignItems:'center', boxShadow:0}
    let cardSx = { p: 5 , pt: 4, m:2, width:0.75, borderRadius:3, display:'flex', flexDirection:{sm:'column',md:'column', xs:'column'}, alignItems:'left'}
    Object.keys(sx).forEach(k => {
        cardSx[k] = sx[k];
    });
   return (
            <Card sx={cardSx}>
                <Card sx={cardContentSx}>
                    {contentCard.map((oneContent,i)=>oneContent)} 
                </Card>
                {button}
            </Card>
   )
}

export default SingleItemCard
