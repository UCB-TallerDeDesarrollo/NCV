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

var accesPermiss = sessionStorage.getItem("Access")

export default function ShowFixedAssets() {
    const navigate = useNavigate();
    const location = useLocation()    
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [alertMessage, setAlertMessage] = useState(location.state ? location.state.alertMessage : null)
    const [severity, setSeverity] = useState(location.state ? location.state.severity : "success")
    const urlAssetStates = 'https://ncv-api.azurewebsites.net/api/assetStates'
    let [urlAssetState, setUrlAssetState] = useState('https://ncv-api.azurewebsites.net/api/assetStates/')   
    const [assetStates, setAssetStates] = useState(null)
    const [errorAssetStates, setErrorAssetStates] = useState(null)
    let errorsFromForm = null
    const [assetState, setAssetState] = useState([]) 
    const [open, setOpen] = useState(showAlert)
    const [assetStateId, setAssetStateId] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)
    const [errorAssetStateDelete, setErrorAssetStateDelete] = useState(null)
    const [errorCreateAssetState, setErrorCreateAssetState] = useState(null)
    const [errorUpdateAssetState, setErrorUpdateAssetState] = useState(null)
    
    const [data, setData] = useState({
        state:''//string
    })

    const [formErrors, setFormErrors] = useState({})
    let assetStatesComponent = null   

    function getAssetStates(){
        axios.get(urlAssetStates).then(            
            (res) => {
                setAssetStates(res.data)
            }
        ).catch((e)=>{
            setErrorAssetStates(e)
        })
    }

    useEffect(() => {
        axios.get(urlAssetStates).then(
            res => setAssetStates(res.data)
        ).catch((e)=>{
            setErrorAssetStates(e)
        })
    }, [])
    
    const fetchDeleteAssetState = () => {    
        axios.delete(urlAssetState + assetStateId)
        .then(function (response) {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Registro Eliminado")
                setSeverity("success")
                setOpen(true)
                setOpenToConfirm(false) 
                getAssetStates()                                          
            }
        })
        .catch(err=> {
            setErrorAssetStateDelete(err)     
            setOpenToConfirm(false)        
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
        const errors = {
            state: '' // string            
        }        
        if(!datas.state||datas.state.length==0)
            errors.state= "El Estado es requerido!"
        return errors     
    }

    const handleSave = ({name,value,previousValue},id) => {
        if(value==previousValue || value=='') {
            window.location.reload()
        }      
        else{
            let updateData = {
                state:value
            }
            submitUpdate(id,updateData)
        }  
        
    }

    function submitUpdate(id,updateData){
        axios.put(urlAssetState + id, updateData).then((res) => {
            if (res.status == 200) {               
                setShowAlert(true)
                setAlertMessage("Estado actualizado")
                setSeverity("success")
                setOpen(true)                    
                getAssetStates()                    
            }            
        }).catch ((apiError) => {
            setErrorUpdateAssetState(apiError)                    
        })
    }

    function submitCreate(){
        errorsFromForm = validate(data)
        setFormErrors(errorsFromForm)
        if(!hasFormErrors(errorsFromForm)){
            axios.post(urlAssetState, data).then((res) => {
                if (res.status == 201) {     
                    setShowAlert(true)
                    setAlertMessage("Estado creado")
                    setSeverity("success")
                    setOpen(true)
                    getAssetStates()
                    setData({
                        state:''//string
                    })
                }            
            }).catch ((apiError) => {
                setErrorCreateAssetState(apiError) 
                checkError()                    
            })
        }else{
            console.log(errorsFromForm)
        }
    }
    if (errorAssetStates) return ErrorPage(errorAssetStates)
    if (errorAssetStateDelete){
        if(errorAssetStateDelete.response.status==400 && errorAssetStateDelete.response.data=="El estado no puede ser eliminado porque existen activos fijos asociados a el."){
            setShowAlert(true)
            setAlertMessage(errorAssetStateDelete.response.data)
            setSeverity("warning")
            setOpen(true)
            setErrorAssetStateDelete(null)
        }
        else
            return ErrorPage(errorAssetStateDelete)
    } 
    if (errorCreateAssetState) return ErrorPage(errorCreateAssetState)
    if (errorUpdateAssetState) return ErrorPage(errorUpdateAssetState)
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

    let deleteAction = (id) => {
        setAssetStateId(id)          
        handleCloseToConfirm()
        ToConfirmOpen()
    }         

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        setOpen(false)
    }
    
    assetStatesComponent = <ListGrid items={assetStatesListElements} withImage={false} editable={true} editActionOnSave={handleSave} withDeleteIcon={true} deleteAction={deleteAction}/>
    return (        
        <>        
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            {accesPermiss=="ComplitAcces"&&
                <ListContainer title="Lista de Estados de Activos Fijos">
                    {assetStatesComponent}
                </ListContainer>
            }   
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
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