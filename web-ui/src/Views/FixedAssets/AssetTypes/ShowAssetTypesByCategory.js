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
import {useNavigate, useLocation } from 'react-router-dom'
import axios from "axios"
import FormContainer from '../../../Components/FormContainer'
import InputText from '../../../Components/InputText'
import DropdownList from '../../../Components/DropdownList'
import Dropdown from '../../../Components/Dropdown'

var accesPermiss = sessionStorage.getItem("Access")

export default function ShowAssetTypesByCategory() {
    const navigate = useNavigate();
    const location = useLocation()    
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [alertMessage, setAlertMessage] = useState(location.state ? location.state.alertMessage : null)
    const [severity, setSeverity] = useState(location.state ? location.state.severity : "success")
    const urlAssetCategories = 'https://ncv-api.azurewebsites.net/api/assetCategories'   
    const [assetTypes, setAssetTypes] = useState(null)
    const [assetCategories, setAssetCategories] = useState(null)
    const [assetCategoryId, setAssetcategoryId] = useState(null)
    const [errorAssetTypes, setErrorAssetTypes] = useState(null)
    let errorsFromForm = null
    const [assetType, setAssetType] = useState([]) 
    const [open, setOpen] = useState(showAlert)
    const [assetTypeId, setAssetTypeId] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)
    const [errorAssetTypeDelete, setErrorAssetTypeDelete] = useState(null)
    const [errorCreateAssetType, setErrorCreateAssetType] = useState(null)
    const [errorUpdateAssetType, setErrorUpdateAssetType] = useState(null)
    const [categorySelectedValue, setCategorySelectedValue] = useState(null)
    
    const [data, setData] = useState({
        type:''//string
    })

    const [formErrors, setFormErrors] = useState({})

    function listAssetTypes(assetTypesByCategory){        
        let assetTypesByCats = assetTypesByCategory.map(actypes => 
            actypes.assetTypes
            )
        setAssetTypes(assetTypesByCats.flat())      
    }

    function getAssetTypesByCategory(){
        axios.get(urlAssetCategories).then(            
            (res) => {
                listAssetTypes(res.data)
                setAssetCategories(res.data)
            }
        ).catch((e)=>{
            setErrorAssetTypes(e)
        })
    }

    useEffect(() => {
        getAssetTypesByCategory()
    }, [])
    
    const fetchDeleteAssetType = () => {  
        axios.delete(`${urlAssetCategories}/${assetCategoryId}/assetTypes/${assetTypeId}`)
        .then(function (response) {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Registro Eliminado")
                setSeverity("success")
                setOpen(true)
                setOpenToConfirm(false) 
                getAssetTypesByCategory()                                          
            }
        })
        .catch(err=> {
            setErrorAssetTypeDelete(err)     
            setOpenToConfirm(false)        
        })
    }

    function hasFormErrors(errorsFromForm){
        let hasErrors=true
        if(!errorsFromForm.type && !errorsFromForm.AssetCategoryId){
            hasErrors = false
        }
        return hasErrors
    }

    const validate = (datas) => {      
        const errors = {
            type: '', // string    
            AssetCategoryId : '' //int
        }      
        if(!categorySelectedValue){
            errors.AssetCategoryId= "La categoría del Activo Fijo es requerida!";
        }  
        if(!datas.type||datas.type.length==0)
            errors.type= "El tipo es requerido!"
        return errors     
    }

    const handleSave = ({name,value,previousValue},id, categoryId) => {
        if(value==previousValue || value=='') {
            window.location.reload()
        }      
        else{
            let updateData = {
                type:value
            }
            setAssetcategoryId(categoryId)       
            setAssetTypeId(id)
            submitUpdate(id,categoryId,updateData)
        }          
    }

    function submitUpdate(id,categoryId,updateData){
        axios.put(`${urlAssetCategories}/${categoryId}/assetTypes/${id}`, updateData).then((res) => {
            if (res.status == 200) {               
                setShowAlert(true)
                setAlertMessage("Tipo actualizado")
                setSeverity("success")
                setOpen(true)                    
                getAssetTypesByCategory()                    
            }            
        }).catch ((apiError) => {
            setErrorUpdateAssetType(apiError)                    
        })
    }

    function submitCreate(){
        errorsFromForm = validate(data)
        setFormErrors(errorsFromForm)
        if(!hasFormErrors(errorsFromForm)){                    
            axios.post(`${urlAssetCategories}/${categorySelectedValue}/assetTypes/`, data).then((res) => {
                if (res.status == 201) {     
                    setShowAlert(true)
                    setAlertMessage("Tipo creado")
                    setSeverity("success")
                    setOpen(true)
                    getAssetTypesByCategory()
                    setData({
                        type:''//string
                    })
                }            
            }).catch ((apiError) => {
                setErrorCreateAssetType(apiError)                               
            })
        }else{
            console.log(errorsFromForm)
        }
    }

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

    let deleteAction = (id, categoryId) => {
        setAssetTypeId(id) 
        setAssetcategoryId(categoryId)         
        handleCloseToConfirm()
        ToConfirmOpen()
    }         

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        setOpen(false)
    }
    if (errorAssetTypes) return ErrorPage(errorAssetTypes)
    if (errorAssetTypeDelete){
        if(errorAssetTypeDelete.response.status==400 && errorAssetTypeDelete.response.data=="El tipo no puede ser eliminado porque existen activos fijos asociados a el."){
            setShowAlert(true)
            setAlertMessage(errorAssetTypeDelete.response.data)
            setSeverity("warning")
            setOpen(true)
            setErrorAssetTypeDelete(null)
        }
        else
            return ErrorPage(errorAssetTypeDelete)
    } 
    if (errorCreateAssetType) return ErrorPage(errorCreateAssetType)
    if (errorUpdateAssetType) return ErrorPage(errorUpdateAssetType)
    if (!assetTypes) return null    
    if(!assetCategories) return null
    if (!assetType)return <h1>ERROR: Tipo de activo fijo no encontrado en la base de datos</h1>
    let categoriesList = assetCategories.map( category =>  { return{
        label: category.category,
        value: category.id      
    }}) 
    const categoriesOptions = categoriesList  
    const assetTypesListElements = assetTypes.map((assetType)=>{
        return {
            id:assetType.id, 
            title: assetType.type,     
            description: '',
            categoryId: assetType.assetCategoryId    
        }
    })
    const listCategories = assetCategories.map((el)=>{
        return {
            id:el.id, 
            title:`${el.category}`,
            description:``
        }
    })
    let assetCategoriesComponent = <DropdownList itemsHeader={listCategories} itemsSubheader={assetTypesListElements} isOpened={true} editableWithHeader={true} editActionOnSave={handleSave} withDeleteIcon={true} deleteActionHeader={deleteAction} />
    return (        
        <>        
            <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            {accesPermiss=="CompleteAccess"&&
                <ListContainer title="Lista de Tipos de Activos Fijos por Categoría">
                    {assetCategoriesComponent}
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
                        ¿Desea eliminar el tipo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteAssetType}></ButtonDanger>
                </DialogActions>
            </Dialog>
            <div style={{display:'flex', justifyContent:'center'}}>
        <FormContainer title="Crear tipo">
            <Dropdown 
                    name={"Categoría"} 
                    id="category-drop" 
                    options={categoriesOptions} 
                    helperText = "Seleccione una categoría" 
                    selectedValue={categorySelectedValue}
                    setSelectedValue = {setCategorySelectedValue}
                    required
                    >                                       
                </Dropdown> 
                {formErrors.AssetCategoryId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetCategoryId}  </Alert>:<p></p> }  
            <InputText
                required
                id="type"
                name="type"
                value={data.type}
                label="Tipo"
                type="text"
                onChange={(e) => {
                    handle(e)            
                }}
            />
            {formErrors.type? <Alert  sx={{ wieditdth: 1, pt: 1 }} severity="error"> 
                {formErrors.type}                   
            </Alert>:<p></p> }
            <ButtonPrimary label={"Crear tipo"} id="submit_button" onClick={submitCreate}/>
            </FormContainer>
            </div>            
        </>                
    )
}