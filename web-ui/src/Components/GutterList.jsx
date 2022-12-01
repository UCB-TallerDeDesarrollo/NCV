import * as React from 'react';
import { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box'
import {   ButtonPrimaryEditIcon, ButtonPrimaryDeleteIcon } from './MUI-Button';



export default function GutterlessList({items, withImage=true, withDeleteIcon=true, deleteAction=null}) {
    
    const navigate = useNavigate();
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
            {items.map((n,i)=> (
                <ListItem
                    key={n.id ? n.id : i} id={n.id}  description={n.description} elementUrl={n.elementUrl} 
                    
                    secondaryAction={
                        <Box sx={{alignSelf:'flex-end', display:'flex-end'}}>
                            <ButtonPrimaryEditIcon   aria-label="Editar" id="edit_button" onClick={() => navigate(n.elementUrl)}  sx={{color:'primary', marginLeft:1, alignSelf:'flex-end' } }title={"Editar"}/>
                            {withDeleteIcon && 
                                <ButtonPrimaryDeleteIcon  id="delete_button"  sx={{marginLeft:1, alignSelf:'flex-end'}} title={"Eliminar"} onClick={()=>{deleteAction(n)}}/>
                            }
                        </Box>
                    }
                    
                    
                >
                <ListItemText primary={n.title} secondary={n.description} key={n.id ? n.id : i} id={n.id} sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}}/>
                    
                </ListItem>
            ))}
         
        </List>
        
    );
}