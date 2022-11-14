import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../../Components/ErrorPage'
import getFromApi from '../../../Components/GetFromApi'
import Navbar from '../../../Components/NavBar'
import ListContainer from '../../../Components/ListContainer'
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../../Components/MUI-Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import ListGrid from '../../../Components/ListGrid'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios"
import FormContainer from '../../../Components/FormContainer'
import InputText from '../../../Components/InputText'
import { WindowSharp } from '@mui/icons-material'
var accesPermiss = sessionStorage.getItem("Access")

export default function ShowFixedAssets() {
    const navigate = useNavigate();
    const location = useLocation()    
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [alertMessage, setAlertMessage] = useState(location.state ? location.state.alertMessage : null)
    const urlAssetStates = 'https://ncv-api.herokuapp.com/api/assetStates/'
    let [urlAssetState, setUrlAssetState] = useState('https://ncv-api.herokuapp.com/api/assetStates/')
    let { apiData: assetStates, error: errorAssetStates } = getFromApi(urlAssetStates) 
    let errorsFromForm = null
    const [assetState, setAssetState] = useState([]) 
    const [open, setOpen] = useState(showAlert)
    const [assetStateId, setAssetStateId] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)
    const [errorAssetStatDelete, setErrorAssetStateDelete] = useState(null)
    const [data, setData] = useState({
        state:''//string
    })
    const [formErrors, setFormErrors] = useState({})
    let assetStatesComponent = null   
    
    const fetchDeleteAssetState = () => {
        axios.delete(urlAssetState)
        .then((response) => {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Registro Eliminado")
                setOpen(true)
                setOpenToConfirm(false) 
                window.location.reload()
                //navigate(`/activos-fijos/estados`,{state:{showAlert:true,alertMessage:"Registro Eliminado"}})                             
            }
        })
        .catch(err=> {
            console.log(err)
            setErrorAssetStateDelete(err)            
        })
    }

    function hasFormErrors(errorsFromForm){
        let hasErrors=true
        if(!errorsFromForm.state){
            hasErrors = false
        }
        return hasErrors
    }

    const validate = (datas) => {      
        console.log(datas)  
        const errors = {
            state: '', // string            
        }        
        if(!datas.state||datas.state.length==0)
            errors.state= "El Estado es requerido!"
        return errors     
    }

    function submitCreate(){
        errorsFromForm = validate(data)
        setFormErrors(errorsFromForm)
        if(!hasFormErrors(errorsFromForm)){
            axios.post(urlAssetState, data).then((res) => {
                if (res.status == 201) {     
                    setShowAlert(true)
                    setAlertMessage("Estado creado")
                    setOpen(true)
                    window.location.reload()
                    //navigate(`/activos-fijos`,{state:{showAlert:true,alertMessage:"Activo Fijo actualizado exitosamente"}})
                }            
            }).catch ((apiError) => {
                setError(apiError) 
                checkError()                    
            })
        }else{
            console.log(errorsFromForm)
        }
    }
    if (errorAssetStates) return ErrorPage(errorAssetStates)
    if (errorAssetStatDelete) return ErrorPage(errorAssetStateDelete)
    if (!assetStates) return null
    if (!assetState)return <h1>ERROR: Estado de activo fijo no encontrado en la base de datos</h1>
    const assetStatesListElements = assetStates.map((assetState)=>{
        return {
            id:assetState.id, 
            title: assetState.state,     
            description: ''       
        }
    })

    function handleClose(event, reason) {
        if (reason === 'clickaway') {            
            return
        }
        setOpen(false)        
    }

    function handleCloseToConfirm(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpenToConfirm(false)
    }
    const ToConfirmOpen = () => {
        handleCloseToConfirm();
        setOpenToConfirm(true);
    }
    let editAction = () => alert("hola")
    
    let deleteAction = (id) => {
        setAssetStateId(id)
        setUrlAssetState(urlAssetState + id)        
        handleCloseToConfirm()
        ToConfirmOpen()
    }         

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        setOpen(false)
    }
    assetStatesComponent = <ListGrid items={assetStatesListElements} withImage={false}  withEditIcon={true} editAction={editAction} withDeleteIcon={true} deleteAction={deleteAction}/>
    
    const listHeaderComponents = 
    <>
        <ButtonPrimary label={"Crear estado"} onClick={()=>showCreateForm()}/>
    </>
    return (
        
        <>
        
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            {accesPermiss=="ComplitAcces"&&
                <ListContainer title="Lista de Estados de Activos Fijos" header={listHeaderComponents}>
                    {assetStatesComponent}
                </ListContainer>
            }   
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}                    
                </Alert>
            </Snackbar>
            <Dialog open={openToConfirm} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
                <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar el estado?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteAssetState}></ButtonDanger>
                </DialogActions>
            </Dialog>
            <div style={{display:'flex', justifyContent:'center'}}>
        <FormContainer title="Crear estado">
            <InputText
                required
                id="state"
                name="state"
                value={data.state}
                label="Estado"
                type="text"
                onChange={(e) => {
                    handle(e)            
                }}
            />
            {formErrors.state? <Alert  sx={{ wieditdth: 1, pt: 1 }} severity="error"> 
                {formErrors.state}                   
            </Alert>:<p></p> }
            <ButtonPrimary label={"Crear estado"} id="submit_button" onClick={submitCreate}/>
            </FormContainer>
            </div>            
        </>                
    )
}