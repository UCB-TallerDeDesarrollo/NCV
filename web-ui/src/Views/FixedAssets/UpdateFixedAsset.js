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
    const [statusSelectedValue, setStatusSelectedValue] = useState(null)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const statusOptions = [
        {
            value: 'Bueno',
            label: 'Bueno',
        },
        {
            value: 'Regular',
            label: 'Regular',
        },
        {
          value: 'Baja',
          label: 'Baja',
        },
        {
          value: 'Obsoleto',
          label: 'Obsoleto'
        }]
    //programHouses
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(null)
    const { apiData:programHouses, error:errorProgramHouses } = getFromApi(urlProgramHouses)    

    const fetchBasicData = () => {
        const responseData = axios(url);
        axios.all([responseData]).then(
            axios.spread((...allData) => {
                setData(allData[0].data)
                console.log(allData[0].data)
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
        if(!errorsFromForm.name && !errorsFromForm.description && !errorsFromForm.price && !errorsFromForm.quantity && !errorsFromForm.programHouseId && !errorsFromForm.assetCategoryId && !errorsFromForm.features){
            hasErrors = false
        }
        return hasErrors
    }
    function submit() {
        const errorsFromForm= validate(data);
        setFormErrors(errorsFromForm)
        setIsSubmit(true)
        //console.log(formErrors)
        //debugger;
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
            name: '', // string
            description: '', // string
            entryDate: '', // dateTime
            price: '', // decimal
            features: '', // string
            quantity: '', // int
            programHouseId : '', //int
            assetCategoryId : '' //int
        }
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
        //debugger
        if(!datas.name){
            errors.name="El Nombre del Activo Fijo es requerido!";
        }else if(datas.name.length>60){
            errors.name="El campo Nombre del Activo Fijo debe ser menor o igual a 60 caracteres!";
        }
    
        if(datas.description.length>1000){
            errors.description="El campo Descripción del Activo Fijo debe ser menor o igual a 1000 caracteres!";
        }
    
        if(!datas.price){
            errors.price= "El Precio del Activo Fijo es requerido!";
        }else if(datas.price < 0){
            errors.price= "El Precio del Activo Fijo debe ser un número positivo!";
        }else if(!regexNumber.test(datas.price)){
            errors.price= "El Precio del Activo Fijo debe ser ingresado en formato decimal!";
        }
    
        if(!datas.quantity){
            errors.quantity= "La Cantidad del Activo Fijo es requerida!";
        }

        if(!programHouseSelectedValue){
            errors.programHouseId= "El programa del Activo Fijo es requerido!";
        }

        if(!categorySelectedValue){
            errors.assetCategoryId= "La categoría del Activo Fijo es requerida!";
        }
    
        if(datas.features.length>1000){
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
                    value={data.name}
                    label="Nombre"
                    type="text"
                    error={nameInputError}
                    helperText={nameError}
                    onChange={(e) => {
                        handle(e)
                        if(data.name.length === 0){
                            setNameInputError(true);
                            setNameError("El nombre del activo no puede estar vacío");
                        }
                        else{
                            setNameInputError(false);
                            setNameError("");
                        } 
                    }}
                />
                {formErrors.name? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.name}                   
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
                {formErrors.assetCategoryId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.assetCategoryId}  </Alert>:<p></p> }             
                <InputText
                    onChange={(e) => handle(e)}
                    id="Description"
                    value={data.description}
                    label="Descripción"
                    type="text"
                />
                {formErrors.description? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.description} </Alert>:<p></p> }
                <InputText
                    onChange={(e) => handle(e)}
                    id="EntryDate"
                    value={data.entryDate}
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
                        if(data.price.length === 0){
                            setPriceInputError(true);
                            setPriceError("El precio del activo no puede estar vacío");
                        }
                        else{
                            setPriceInputError(false);
                            setPriceError("");
                        } 
                    }}
                    id="Price"
                    value={data.price}
                    label="Precio"
                    type="number"
                    error={priceInputError}
                    helperText={priceError}
                />
                {formErrors.price? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.price}  </Alert>:<p></p> }
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
                        if(data.programHouseId.length === 0){
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
                {formErrors.programHouseId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.programHouseId}  </Alert>:<p></p> }                 
                
                <InputText
                    onChange={(e) => handle(e)}
                    id="Features"
                    value={data.features}
                    label="Características"
                    type="text"
                />
                 {formErrors.features? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.features} </Alert>:<p></p> }
                <Dropdown 
                    name={"Estado"} 
                    id="estado-drop" 
                    options={statusOptions}                                         
                    selectedValue={statusSelectedValue}
                    setSelectedValue = {setStatusSelectedValue}
                    required                    
                    >                                        
                </Dropdown>
                <InputText
                    required
                    onChange={(e) => {
                        handle(e)
                        if(data.quantity.length === 0){
                            setQuantityInputError(true);
                            setQuantityError("La cantidad del activo no puede estar vacía");
                        }
                        else{
                            setQuantityInputError(false);
                            setQuantityError("");
                        } 
                    }}
                    id="Quantity"
                    value={data.quantity}
                    label="Cantidad"
                    type="number"
                    error={quantityInputError}
                    helperText={quantityError}
                />
                {formErrors.quantity? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.quantity}  </Alert>:<p></p> }
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