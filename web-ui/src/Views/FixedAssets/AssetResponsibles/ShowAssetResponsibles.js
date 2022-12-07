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

export default function ShowFixedAssetsResponsibles() {
    const navigate = useNavigate();
    const location = useLocation()    
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [alertMessage, setAlertMessage] = useState(location.state ? location.state.alertMessage : null)
    const [severity, setSeverity] = useState(location.state ? location.state.severity : "success")
    const urlAssetResponsibles = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'  
    let [urlAssetResponsible, setUrlAssetResponsible] = useState('https://ncv-api.azurewebsites.net/api/assetResponsibles/')   
    const [assetResponsibles, setAssetResponsibles] = useState(null)
    const [errorAssetResponsibles, setErrorAssetResponsibles] = useState(null)
    let errorsFromForm = null
    const [assetResponsible, setAssetResponsible] = useState([]) 
    const [open, setOpen] = useState(showAlert)
    const [assetResponsibleId, setAssetResponsibleId] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)
    const [errorAssetResponsibleDelete, setErrorAssetResponsibleDelete] = useState(null)
    const [errorCreateAssetResponsible, setErrorCreateAssetResponsible] = useState(null)
    const [errorUpdateAssetResponsible, setErrorUpdateAssetResponsible] = useState(null)
    
    const [data, setData] = useState({
        name:''//string
    })

    const [formErrors, setFormErrors] = useState({})
    let assetResponsiblesComponent = null   

    function getAssetResponsibles(){
        axios.get(urlAssetResponsibles).then(            
            (res) => {
                setAssetResponsibles(res.data)
            }
        ).catch((e)=>{
            setErrorAssetResponsibles(e)
        })
    }

    useEffect(() => {
        axios.get(urlAssetResponsibles).then(
            res => setAssetResponsibles(res.data)
        ).catch((e)=>{
            setErrorAssetResponsibles(e)
        })
    }, [])
    
    const fetchDeleteAssetResponsible = () => {    
        axios.delete(urlAssetResponsible + assetResponsibleId)
        .then(function (response) {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Registro Eliminado")
                setSeverity("success")
                setOpen(true)
                setOpenToConfirm(false) 
                getAssetResponsibles()                                          
            }
        })
        .catch(err=> {
            setErrorAssetResponsibleDelete(err)     
            setOpenToConfirm(false)        
        })
    }

    function hasFormErrors(errorsFromForm){
        let hasErrors=true
        if(!errorsFromForm.name){
            hasErrors = false
        }
        return hasErrors
    }

    const validate = (datas) => {      
        const errors = {
            name: '' // string            
        }        
        if(!datas.name||datas.name.length==0)
            errors.name= "El Responsable es requerido!"
        return errors     
    }

    const handleSave = ({name,value,previousValue},id) => {
        if(value==previousValue || value=='') {
            window.location.reload()
        }      
        else{
            let updateData = {
                name:value
            }
            submitUpdate(id,updateData)
        }  
        
    }

    function submitUpdate(id,updateData){
        axios.put(urlAssetResponsible + id, updateData).then((res) => {
            if (res.status == 200) {               
                setShowAlert(true)
                setAlertMessage("Responsable actualizado")
                setSeverity("success")
                setOpen(true)                    
                getAssetResponsibles()                    
            }            
        }).catch ((apiError) => {
            setErrorUpdateAssetResponsible(apiError)                    
        })
    }

    function submitCreate(){
        errorsFromForm = validate(data)
        setFormErrors(errorsFromForm)
        if(!hasFormErrors(errorsFromForm)){
            axios.post(urlAssetResponsible, data).then((res) => {
                if (res.status == 201) {     
                    setShowAlert(true)
                    setAlertMessage("Responsable creado")
                    setSeverity("success")
                    setOpen(true)
                    getAssetResponsibles()
                    setData({
                        name:''//string
                    })
                }            
            }).catch ((apiError) => {
                setErrorCreateAssetResponsible(apiError) 
                checkError()                    
            })
        }else{
            console.log(errorsFromForm)
        }
    }
    if (errorAssetResponsibles) return ErrorPage(errorAssetResponsibles)
    if (errorAssetResponsibleDelete){
        if(errorAssetResponsibleDelete.response.status==400 && errorAssetResponsibleDelete.response.data=="El responsable no puede ser eliminado porque existen activos fijos asociados a el."){
            setShowAlert(true)
            setAlertMessage(errorAssetResponsibleDelete.response.data)
            setSeverity("warning")
            setOpen(true)
            setErrorAssetResponsibleDelete(null)
        }
        else
            return ErrorPage(errorAssetResponsibleDelete)
    } 
    if (errorCreateAssetResponsible) return ErrorPage(errorCreateAssetResponsible)
    if (errorUpdateAssetResponsible) return ErrorPage(errorUpdateAssetResponsible)
    if (!assetResponsibles) return null    
    if (!assetResponsible)return <h1>ERROR: Responsable de activo fijo no encontrado en la base de datos</h1>
    const assetResponsiblesListElements = assetResponsibles.map((assetResponsible)=>{
        return {
            id:assetResponsible.id, 
            title: assetResponsible.name,     
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
        setAssetResponsibleId(id)          
        handleCloseToConfirm()
        ToConfirmOpen()
    }         

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        setOpen(false)
    }
    
    assetResponsiblesComponent = <ListGrid items={assetResponsiblesListElements} withImage={false} editable={true} editActionOnSave={handleSave} withDeleteIcon={true} deleteAction={deleteAction}/>
    return (        
        <>        
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            {accesPermiss=="CompleteAccess"&&
                <ListContainer title="Lista de Responsables de Activos Fijos">
                    {assetResponsiblesComponent}
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
                        ¿Desea eliminar el responsable?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteAssetResponsible}></ButtonDanger>
                </DialogActions>
            </Dialog>
            <div style={{display:'flex', justifyContent:'center'}}>
        <FormContainer title="Crear responsable">
            <InputText
                required
                id="name"
                name="name"
                value={data.name}
                label="Responsable"
                type="text"
                onChange={(e) => {
                    handle(e)            
                }}
            />
            {formErrors.name? <Alert  sx={{ wieditdth: 1, pt: 1 }} severity="error"> 
                {formErrors.name}                   
            </Alert>:<p></p> }
            <ButtonPrimary label={"Crear responsable"} id="submit_button" onClick={submitCreate}/>
            </FormContainer>
            </div>
        </>                
    )
}