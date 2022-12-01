import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ButtonPrimary, { ButtonDanger, ButtonSecondary, ButtonPrimaryEditIcon, ButtonPrimaryDeleteIcon } from './MUI-Button';
import ListElement from './ListElement';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import TranslateRole from './Translate'

export default function DropdownList({itemsHeader, itemsSubheader, isOpened = false, editable=false, withDeleteIcon=false, deleteAction=null,editActionOnSave=null, deleteActionHeader=null,editableWithHeader=false}) {
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();
  const didChange = useRef(false);
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
      fontWeight: 'bold'
    }
  }

  const visibleItems = {
    'Tia': true, 
    'Administrador': true,
    'Soporte': true,
}

  if(isOpened != didChange.current){
    setIsVisible({...visibleItems})
    didChange.current = isOpened
  }

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
  
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
      {itemsHeader.map((h,i)=>{
        return (<>
            <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={h.id} alignItems="flex-start"
              onClick={() => setIsVisible({
                ...isVisible,
                [h.title]: !isVisible?.[h.title],
              })}
            >
            <ListItemText primary={h.title} secondary={h.description} className="ListElement" sx={sxListItemText}/>
            {!isVisible?.[h.title] ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
            </ListItemButton>
                {!isVisible?.[h.title] ? null : itemsSubheader.map((n,i)=>{

                        if (h.title == n.nameRole) {
                            return (
                                <ListItem
                                    key={n.id ? n.id : i} id={n.id}  description={n.description} elementUrl={n.elementUrl} 
                                    
                                    secondaryAction={
                                        <Box sx={{alignSelf:'flex-end', display:'flex-end'}}>
                                            <ButtonPrimaryEditIcon id="edit_button" onClick={() => navigate(n.elementUrl)} sx={{color:'primary', marginLeft:1, alignSelf:'flex-end'}}/>
                                            {true && <ButtonPrimaryDeleteIcon id="delete_button" onClick={ToConfirmOpen} sx={{marginLeft:1, alignSelf:'flex-end'}}/>}
                                        </Box>
                                    }
                                    
                                    
                                ></ListItem>                              
                                 
                            )
                        }
                })}
        </>)})}
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
  )};