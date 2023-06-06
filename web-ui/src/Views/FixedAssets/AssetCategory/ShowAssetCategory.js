import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../../Components/ErrorPage'
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
import { useLocation } from 'react-router-dom'
import axios from "axios"
import FormContainer from '../../../Components/FormContainer'
import InputText from '../../../Components/InputText'

let accesPermiss = sessionStorage.getItem("Access")

export default function ShowFixedAssets() {
    const location = useLocation()    
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [alertMessage, setAlertMessage] = useState(location.state ? location.state.alertMessage : null)
    const [severity, setSeverity] = useState(location.state ? location.state.severity : "success")
    const urlassetCategorys = process.env.REACT_APP_BACKEND_URL + '/api/assetCategories'
    const urlassetCategory = process.env.REACT_APP_BACKEND_URL + '/api/assetCategories/'
    const [assetCategorys, setassetCategorys] = useState(null)
    const [errorassetCategorys, setErrorassetCategorys] = useState(null)
    let errorsFromForm = null
    const [open, setOpen] = useState(showAlert)
    const [assetCategoryId, setassetCategoryId] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)
    const [errorassetCategoryDelete, setErrorassetCategoryDelete] = useState(null)
    const [errorCreateassetCategory, setErrorCreateassetCategory] = useState(null)
    const [errorUpdateassetCategory, setErrorUpdateassetCategory] = useState(null)  

    const [data, setData] = useState({
        category:'',//string
        code:'',
        AssetTypes: [],
        Type:''
    })

    const [formErrors, setFormErrors] = useState({})
    let assetCategorysComponent = null

    function getassetCategorys(){        
        axios.get(urlassetCategorys).then(                                       
            (res) => {                
                setassetCategorys(res.data)
            }
        ).catch((e)=>{
            setErrorassetCategorys(e)
        })
        
    }

    useEffect(() => {
        axios.get(urlassetCategorys).then(
            res => setassetCategorys(res.data)
        ).catch((e)=>{
            setErrorassetCategorys(e)
        })
    }, [])
    
    const fetchDeleteassetCategory = () => {    
        axios.delete(urlassetCategory + assetCategoryId)
        .then(function (response) {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Registro Eliminado")
                setSeverity("success")
                setOpen(true)
                setOpenToConfirm(false) 
                getassetCategorys()                                          
            }
        })
        .catch(err=> {
            setErrorassetCategoryDelete(err)     
            setOpenToConfirm(false)        
        })
    }

    function hasFormErrors(errorsFromForm){
        let hasErrors=true        
        if(!errorsFromForm.category && !errorsFromForm.code){            
            hasErrors = false
        }
        return hasErrors
    }

    const validate = (datas) => {         
        const errors = {
            category: '', // string            
            code:''
        }        
        if(!datas.category||datas.category.length==0){            
            errors.category= "La categoria es requerida!"
        }
        if(!datas.code||datas.code.length==0){            
            errors.code= "El codigo corto es requerido!"
        }
        return errors     
    }

    const handleSave = ({value,previousValue},id) => {        
        const separadorTextoGuion = /^(.*?)\s*-\s*(.*?)$/;
        const matches  = value.match(separadorTextoGuion);   
        if(value==previousValue || value=='') {
            window.location.reload()
        }      
        else{
            const categoriaNueva = matches[1].trim();
            const codigoCorto = matches[2].trim();                    
            let updateData = {
                category:codigoCorto,
                code:categoriaNueva         
            }
            submitUpdate(id,updateData)
        }  
        
    }

    function submitUpdate(id,updateData){
        axios.put(urlassetCategory + id, updateData).then((res) => {
            if (res.status == 200) {               
                setShowAlert(true)
                setAlertMessage("Estado actualizado")
                setSeverity("success")
                setOpen(true)                    
                
                getassetCategorys()                                    
            }            
        }).catch ((apiError) => {
            setErrorUpdateassetCategory(apiError)                    
        })
    }

    function submitCreate(){
        errorsFromForm = validate(data)        
        setFormErrors(errorsFromForm)
        if(!hasFormErrors(errorsFromForm)){                        
            axios.post(urlassetCategory,data).then((res) => {            
            if (res.status == 201) {
                setShowAlert(true)
                setAlertMessage("Categoria creada")
                setSeverity("success")
                setOpen(true)
                getassetCategorys()                
                setData({
                    category:'',//string
                    code:'',
                    AssetTypes: [],
                    Type:''
                })
            }
            }).catch ((apiError) => {                
                setErrorCreateassetCategory(apiError) 
                checkError()                    
            })
        }
    }
    if (errorassetCategorys) return ErrorPage(errorassetCategorys)
    if (errorassetCategoryDelete){                
        if(errorassetCategoryDelete.response.status==500 && errorassetCategoryDelete.response.data=="Lo sentimos, algo sucedió: An error occurred while saving the entity changes. See the inner exception for details."){            
            setShowAlert(true)
            errorassetCategoryDelete.response.data = "El estado no puede ser eliminado porque existen activos fijos asociados a el."
            setAlertMessage(errorassetCategoryDelete.response.data)
            setSeverity("warning")
            setOpen(true)
            setErrorassetCategoryDelete(null)
        }
        else
            return ErrorPage(errorassetCategoryDelete)
    } 
    if (errorCreateassetCategory) return ErrorPage(errorCreateassetCategory)
    if (errorUpdateassetCategory) return ErrorPage(errorUpdateassetCategory)
    if (!assetCategorys) return null
    const assetCategorysListElements = assetCategorys.map((assetCategory)=>{        
        return {
            id:assetCategory.id, 
            title: assetCategory.code + " - " + assetCategory.category,
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
        setassetCategoryId(id)     
        handleCloseToConfirm()
        ToConfirmOpen()
    }

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value        
        setData(newData)
        setOpen(false)
    }   
    
    assetCategorysComponent = <ListGrid items={assetCategorysListElements} withImage={false} editable={true} editActionOnSave={handleSave} withDeleteIcon={true} deleteAction={deleteAction}/>
    return (        
        <>        
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            {accesPermiss=="CompleteAccess"&&
                <ListContainer title="Lista de Categorias de Activos Fijos">
                    {assetCategorysComponent}
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
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteassetCategory}></ButtonDanger>
                </DialogActions>
            </Dialog>
            <div style={{display:'flex', justifyContent:'center'}}>
        <FormContainer title="Crear Categoria">
        { <InputText
                required
                onChange={(e) => handle(e)}
                id="code"
                name="code"
                value={data.code}
                label="Codigo Corto"
                type="text"                                
            />}
            {formErrors.code? <Alert  sx={{ wieditdth: 1, pt: 1 }} severity="error"> 
                {formErrors.code}
            </Alert>:<p></p> }
            <InputText
                required                
                id="category"
                name="category"
                value={data.category}
                label="Categoria"
                type="text"                
                onChange={(e) => {
                    handle(e)    
                }}
            />
            {formErrors.category? <Alert  sx={{ wieditdth: 1, pt: 1 }} severity="error"> 
                {formErrors.category}
            </Alert>:<p></p> }
            <ButtonPrimary label={"Crear Categoria"} id="submit_button" onClick={submitCreate}/>
            </FormContainer>
            </div>            
        </>                
    )
}