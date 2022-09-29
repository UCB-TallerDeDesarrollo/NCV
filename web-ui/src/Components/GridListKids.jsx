import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ListElement from './ListElement';

export default function BasicGrid({items, withImage=true}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
      {items.map((n,i)=>{
        return (<>
            <Grid>
             <ListElement key={n.id ? n.id : i} id={n.id} title={n.title} description={n.description} elementUrl={n.elementUrl} imgSrc={n.imgSrc} withImage={withImage}/>
            </Grid>
        </>)})}
      </Grid>
    </Box>
  );
}