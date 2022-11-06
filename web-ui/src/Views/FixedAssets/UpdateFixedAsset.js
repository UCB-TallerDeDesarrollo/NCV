import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorPage from '../../Components/ErrorPage'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Navbar from '../../Components/NavBar'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import ButtonPrimary from '../../Components/MUI-Button'
import getFromApi from '../../Components/GetFromApi'
import Dropdown from '../../Components/Dropdown'
import axios from 'axios';

export default function UpdateFixedAssetForm(props) {
    const { fixedAssetId } = useParams()
    const url = `https://ncv-api.herokuapp.com/api/fixedAssets/${fixedAssetId}`
    const urlProgramHouses = 'https://ncv-api.herokuapp.com/api/programHouses'
    const urlCategories = 'https://ncv-api.herokuapp.com/api/assetCategories'
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [nameInputError, setNameInputError] = useState(null)
    const [nameError, setNameError] = useState("")
    const [categoryInputError, setCategoryInputError] = useState(null)
    const [categoryError, setCategoryError] = useState("Seleccione una categoría")
    const [priceInputError, setPriceInputError] = useState(null)
    const [priceError, setPriceError] = useState("")
    const [programInputError, setProgramInputError] = useState(null)
    const [programError, setProgramError] = useState("Seleccione un programa")
    const [quantityInputError, setQuantityInputError] = useState(null)
    const [quantityError, setQuantityError] = useState("")
    const navigate = useNavigate()
    const [data, setData] = useState([])
    //programHouses
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(null)
    const { apiData:programHouses, error:errorProgramHouses } = getFromApi(urlProgramHouses)    

    const fetchBasicData = () => {
        const responseData = axios(url);
        axios.all([responseData]).then(
            axios.spread((...allData) => {
                setData(allData[0].data)
            }))
    }

    useEffect(()=>{
        // console.log(formErrors)
        fetchBasicData();
        if (Object.keys(formErrors).length === 0 && isSubmit){
        //    console.log(data);
        }
    },[formErrors]);
    //categories
    const [categorySelectedValue, setCategorySelectedValue] = useState(null)
    const { apiData:categories, error:errorCategory } = getFromApi(urlCategories) 
    if(errorProgramHouses){
        return ErrorPage(errorProgramHouses)
    }
    if (!programHouses) return null 
    let programHousesList = programHouses.map( programHouse =>  { return{
        label: programHouse.acronym,
        value: programHouse.id      
    }}) 
    const programHousesOptions = programHousesList 
    if(errorCategory){
        return ErrorPage(errorCategory)
    }
    if (!categories) return null        
    let categoriesList = categories.map( category =>  { return{
        label: category.category,
        value: category.id      
    }}) 
    const categoriesOptions = categoriesList  

    function handle(e) {
        const {name, value} = e.target
        setData({
            ...data,
            [name]:value
        })
        setOpen(false)
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    
    function checkError(){
        if(error){
            //setOpen(true)
            return ErrorPage(error)
        }
    }
    function hasFormErrors(errorsFromForm){
        console.log('form errors',errorsFromForm)
        let hasErrors=true
        if(!errorsFromForm.Name && !errorsFromForm.Description && !errorsFromForm.Price && !errorsFromForm.Quantity && !errorsFromForm.ProgramHouseId && !errorsFromForm.AssetCategoryId && !errorsFromForm.Features){
            hasErrors = false
        }
        return hasErrors
    }
    function submit() {
        const errorsFromForm= validate(data);
        setFormErrors(errorsFromForm)
        setIsSubmit(true)
        //console.log(formErrors)
        //debugger
        if(!hasFormErrors(errorsFromForm)){
            axios.put(url, data).then((res) => {
                if (res.status == 201) {               
                    navigate(`/activos-fijos`,{state:{showAlert:true,alertMessage:"Activo Fijo actualizado exitosamente"}})
                }            
            }).catch ((apiError) => {
                setError(apiError) 
                checkError()                    
            })
        }
    }

    const validate = (datas) => {        
        const errors = {
            Name: '', // string
            Description: '', // string
            EntryDate: '', // dateTime
            Price: '', // decimal
            Features: '', // string
            Quantity: '', // int
            ProgramHouseId : '', //int
            AssetCategoryId : '' //int
        }
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
        //debugger
        if(!datas.Name){
            errors.Name="El Nombre del Activo Fijo es requerido!";
        }else if(datas.Name.length>60){
            errors.Name="El campo Nombre del Activo Fijo debe ser menor o igual a 60 caracteres!";
        }
    
        if(datas.Description.length>1000){
            errors.Description="El campo Descripción del Activo Fijo debe ser menor o igual a 1000 caracteres!";
        }
    
        if(!datas.Price){
            errors.Price= "El Precio del Activo Fijo es requerido!";
        }else if(datas.Price < 0){
            errors.Price= "El Precio del Activo Fijo debe ser un número positivo!";
        }else if(!regexNumber.test(datas.Price)){
            errors.Price= "El Precio del Activo Fijo debe ser ingresado en formato decimal!";
        }
    
        if(!datas.Quantity){
            errors.Quantity= "La Cantidad del Activo Fijo es requerida!";
        }

        if(!programHouseSelectedValue){
            errors.ProgramHouseId= "El programa del Activo Fijo es requerido!";
        }

        if(!categorySelectedValue){
            errors.AssetCategoryId= "La categoría del Activo Fijo es requerida!";
        }
    
        if(datas.Features.length>1000){
            errors.Features= "El campo de Características del Activo Fijo debe ser menor o igual a 1000 caracteres!";
        }
        console.log('errs',errors)
        return errors
    }
    

    if(error){
        //setOpen(true)
        return ErrorPage(error)
    }
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
        </Box>
        <div style={{display:'flex', justifyContent:'center'}}>
            <FormContainer title="Editar activo fijo">
                <InputText
                    required
                    id="Name"
                    name="Name"
                    value={data.Name}
                    label="Nombre"
                    type="text"
                    error={nameInputError}
                    helperText={nameError}
                    onChange={(e) => {
                        handle(e)
                        if(data.Name.length === 0){
                            setNameInputError(true);
                            setNameError("El nombre del activo no puede estar vacío");
                        }
                        else{
                            setNameInputError(false);
                            setNameError("");
                        } 
                    }}
                />
                {formErrors.Name? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Name}                   
                </Alert>:<p></p> }
                <Dropdown 
                    name={"Categoría"} 
                    id="category-drop" 
                    options={categoriesOptions} 
                    error={categoryInputError}
                    helperText={categoryError} 
                    selectedValue={categorySelectedValue}
                    setSelectedValue = {setCategorySelectedValue}
                    required
                    onChange={(e) => {
                        handle(e)
                        if(data.AssetCategoryId.length === 0){
                            setCategoryInputError(true);
                            setCategoryError("La categoría del activo no puede estar vacía");
                        }
                        else{
                            setCategoryInputError(false);
                            setCategoryError("");
                        } 
                    }}
                    >                                        
                </Dropdown> 
                {formErrors.AssetCategoryId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetCategoryId}  </Alert>:<p></p> }             
                <InputText
                    onChange={(e) => handle(e)}
                    id="Description"
                    value={data.Description}
                    label="Descripción"
                    type="text"
                />
                {formErrors.Description? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.Description} </Alert>:<p></p> }
                <InputText
                    onChange={(e) => handle(e)}
                    id="EntryDate"
                    value={data.EntryDate}
                    label="Fecha de Entrada"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <InputText
                    required
                    onChange={(e) => {
                        handle(e)
                        if(data.Price.length === 0){
                            setPriceInputError(true);
                            setPriceError("El precio del activo no puede estar vacío");
                        }
                        else{
                            setPriceInputError(false);
                            setPriceError("");
                        } 
                    }}
                    id="Price"
                    value={data.Price}
                    label="Precio"
                    type="number"
                    error={priceInputError}
                    helperText={priceError}
                />
                {formErrors.Price? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.Price}  </Alert>:<p></p> }
                <Dropdown 
                    name={"Programa"} 
                    id="programa-drop" 
                    options={programHousesOptions} 
                    error={programInputError}
                    helperText={programError}
                    selectedValue={programHouseSelectedValue}
                    setSelectedValue = {setProgramHouseSelectedValue}
                    required
                    onChange={(e) => {
                        handle(e)
                        if(data.ProgramHouseId.length === 0){
                            setProgramInputError(true);
                            setProgramError("El programa del activo no puede estar vacío");
                        }
                        else{
                            setProgramInputError(false);
                            setProgramError("");
                        } 
                    }}
                    >                                        
                </Dropdown>   
                {formErrors.ProgramHouseId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.ProgramHouseId}  </Alert>:<p></p> }                 
                
                <InputText
                    onChange={(e) => handle(e)}
                    id="Features"
                    value={data.Features}
                    label="Características"
                    type="text"
                />
                 {formErrors.Features? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.Features} </Alert>:<p></p> }
                <InputText
                    required
                    onChange={(e) => {
                        handle(e)
                        if(data.Quantity.length === 0){
                            setQuantityInputError(true);
                            setQuantityError("La cantidad del activo no puede estar vacía");
                        }
                        else{
                            setQuantityInputError(false);
                            setQuantityError("");
                        } 
                    }}
                    id="Quantity"
                    value={data.Quantity}
                    label="Cantidad"
                    type="number"
                    error={quantityInputError}
                    helperText={quantityError}
                />
                {formErrors.Quantity? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.Quantity}  </Alert>:<p></p> }
                <ButtonPrimary label={"Guardar cambios"} id="submit_button" onClick={submit}/>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                </Snackbar>
            </FormContainer>
        </div>
        </>
    )
}