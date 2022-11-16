import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ListElement from './ListElement';

export default function ListGrid({items, withImage=true, withEditIcon=false, editAction=null, editable=false, editActionOnSave=null, withDeleteIcon=false, deleteAction=null}) {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#fff'}}>
      <Grid container spacing={1.5} rowSpacing={0}>
      {items.map((n,i)=>{
        return (
            <Grid item key={n.id ? n.id : i} xs={12} sm={6} md={4}>
             <ListElement  key={n.id ? n.id : i} id={n.id} title={n.title} description={n.description} elementUrl={n.elementUrl} imgSrc={n.imgSrc} withImage={withImage} withEditIcon={withEditIcon} editAction={editAction} editable={editable} editActionOnSave={editActionOnSave} withDeleteIcon={withDeleteIcon} deleteAction={deleteAction}/>
            </Grid>
          )})}
      </Grid>
    </Box>
  );
}