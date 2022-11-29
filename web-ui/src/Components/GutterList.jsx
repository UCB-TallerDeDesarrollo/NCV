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
import ButtonPrimary, { ButtonDanger, ButtonSecondary, ButtonPrimaryEditIcon, ButtonPrimaryDeleteIcon } from './MUI-Button';
import Alert from '@mui/material/Alert';
import { ListItemIcon, Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function GutterlessList({items, withImage=true, withDeleteIcon=false}) {
    const [openToConfirmDelete, setOpenToConfirmDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState([])
    function fetchDeleteUSer(){

    }
    function handleCloseToConfirm(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpenToConfirmDelete(false)
    }
    const ToConfirmOpen = () => {
        handleCloseToConfirm();
        setOpenToConfirmDelete(true);
    };
    const navigate = useNavigate();
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
        {items.map((n,i)=> (
            <ListItem
                key={n.id ? n.id : i} id={n.id}  description={n.description} elementUrl={n.elementUrl} 
                
                secondaryAction={
                    <Box sx={{alignSelf:'flex-end', display:'flex-end'}}>
                        <ButtonPrimaryEditIcon id="edit_button" onClick={() => navigate(n.elementUrl)} sx={{color:'primary', marginLeft:1, alignSelf:'flex-end'}}/>
                        {true && <ButtonPrimaryDeleteIcon id="delete_button" onClick={ToConfirmOpen} sx={{marginLeft:1, alignSelf:'flex-end'}}/>}
                    </Box>
                }
                
                
            >
            <ListItemText primary={n.title} secondary={n.description} key={n.id ? n.id : i} id={n.id} sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}}/>
                
            </ListItem>
        ))}
         <Dialog open={openToConfirmDelete} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
            <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea eliminar todos los datos de {selectedRow.title}?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteUSer}></ButtonDanger>
            </DialogActions>
        </Dialog>
        </List>
        
    );
}