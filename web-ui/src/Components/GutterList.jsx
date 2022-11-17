import * as React from 'react';
import { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from './MUI-Button';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function GutterlessList({items, withImage=true, withDeleteIcon=false}) {
    const [openToConfirmDelete, setOpenToConfirmDelete] = useState(false);
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
                key={n.id ? n.id : i} id={n.id} title={n.title} description={n.description} elementUrl={n.elementUrl} imgSrc={n.imgSrc} 
                
                secondaryAction={
                    <IconButton >
                        <EditIcon fontSize="small" aria-label="edit" onClick={()=>navigate(n.elementUrl)} />
                        {true &&<DeleteIcon fontSize="small" aria-label="delete" onClick={ToConfirmOpen} color='error'/>}

                        
                    </IconButton>
                }
                
            >
            <ListItemText primary={n.title} secondary={n.description} key={n.id ? n.id : i} id={n.id} sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}}/>
                <Dialog open={openToConfirmDelete} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
                    <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Desea eliminar todos los datos de {n.title}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                        <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteUSer}></ButtonDanger>
                    </DialogActions>
                </Dialog>
            </ListItem>
        ))}
        </List>
    );
}