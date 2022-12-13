import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ButtonDanger, ButtonSecondary, ButtonPrimaryEditIcon, ButtonPrimaryDeleteIcon } from './MUI-Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios"

export default function DropdownListUser({itemsHeader, itemsSubheader, isOpened = false, editable=false, withDeleteIcon=false}) {

  console.log(itemsHeader)
  console.log(itemsSubheader)
  const url = process.env.REACT_APP_BACKEND_URL + '/api/auth'
  const [isVisible, setIsVisible] = useState({});
  const [userSelect, setUserSelect] = useState(0)
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
  const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
  const [open, setOpen] = useState(showAlert)
  const [openToConfirmDelete, setOpenToConfirmDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState([])
  const [openToConfirm, setOpenToConfirm] = useState(false)
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
let deleteAction = (id) => {
    setUserSelect(id)          
    handleCloseToConfirm()
    ToConfirmOpen()
}


const fetchDeleteUSer = () => {  
  axios
    .delete(url + "/"+userSelect.id)
    .then(function (response) {
        console.log(response)
        if (response.status == 200){
            setShowAlert(true)
            setAlertMessage("Usuario Eliminado")
            setSeverity("success")
            setOpen(true)
            setOpenToConfirm(false)  
            navigate(`/vista-usuarios`,{state:{showAlert:true,alertMessage:"Usuario eliminado exitosamente"}})                                        
        }   
  })
  .catch(err=> {
      console.log(response)
      setOpenToConfirm(false)        
  })
}
  
  

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
                          return(
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
                          )

                        }
                })}
        </>)})}
        <Dialog open={openToConfirmDelete} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
            <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Desea eliminar todos los datos {userSelect.title}?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteUSer}></ButtonDanger>
            </DialogActions>
        </Dialog>
    </List>
  )};