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
import ButtonPrimary from '../../Components/MUI-Button'
import getFromApi from '../../Components/GetFromApi'
import Dropdown from '../../Components/Dropdown'
import {getFixedAssets} from '../../Components/GetFromApi'

function CreateFixedAssetForm(props) {
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    const urlProgramHouses = 'https://ncv-api.herokuapp.com/api/programHouses'
    const urlCategories = 'https://ncv-api.herokuapp.com/api/assetCategories'
    const urlStates = 'https://ncv-api.herokuapp.com/api/assetStates'
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
    const assetsCodes = []
    getAssetsCodes();
    let programCode = ''
    let categoryCode = ''
    const navigate = useNavigate()
    const [data, setData] = useState({
        Name: '', // string
        Code: '', // string
        Description: '', // string
        EntryDate: '', // dateTime
        Price: '', // decimal
        Features: '', // string
        ProgramHouseId : '', //int
        AssetCategoryId : '', //int
        AssetStateId: '' //string
    })
    //programHouses
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(null)
    const { apiData:programHouses, error:errorProgramHouses } = getFromApi(urlProgramHouses)    

    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit){
        }
    },[formErrors]);

    //categories
    const [categorySelectedValue, setCategorySelectedValue] = useState(null)
    const { apiData:categories, error:errorCategory } = getFromApi(urlCategories) 

    //states
    const [stateSelectedValue, setStateSelectedValue] = useState(null)
    const { apiData:states, error:errorStates } = getFromApi(urlStates)   

    // program Houses Options for DROPDOWN
    if(errorProgramHouses){
        return ErrorPage(errorProgramHouses)
    }
    if (!programHouses) return null 
    let programHousesList = programHouses.map( programHouse =>  { return{
        label: programHouse.acronym,
        value: programHouse.id      
    }}) 
    const programHousesOptions = programHousesList 

    // categories options for DROPDOWN
    if(errorCategory){
        return ErrorPage(errorCategory)
    }
    if (!categories) return null        
    let categoriesList = categories.map( category =>  { return{
        label: category.category,
        value: category.id      
    }}) 
    const categoriesOptions = categoriesList  

    //states options for DROPDOWN
    if(errorStates){
        return ErrorPage(errorStates)
    }
    if (!states) return null 
    let statesList = states.map( state =>  { return{
        label: state.state,
        value: state.id      
    }}) 
    const stateOptions = statesList 

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
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
            return ErrorPage(error)
        }
    }
    function hasFormErrors(errorsFromForm){
        let hasErrors=true
        if(!errorsFromForm.Name && !errorsFromForm.Description && !errorsFromForm.Price && !errorsFromForm.ProgramHouseId && !errorsFromForm.AssetCategoryId && !errorsFromForm.Features && !errorsFromForm.Code && !errorsFromForm.AssetStateId){
            hasErrors = false
        }
        return hasErrors
    }

    function getAssetsCodes(){
        const url = 'https://ncv-api.herokuapp.com/api/fixedAssets/'
        getFixedAssets(url).then(
            response => {
                if(response.name != "AxiosError"){
                    response.data.map((el)=>{
                        var splitCode = el.code.split("-")
                        assetsCodes.push(splitCode[splitCode.length-1]);
                        return response;
                    })
                }
                setHasErrorWithFetch(response)
            }
        )
    }

    function getProgramCode(programValue){
        let programCode = ''
        programHousesOptions.forEach(function (program){
            if(programValue == program.value){
                programCode = program.label
            }
        });
        return programCode
    }

    function getCategoryCode(categoryValue){
        let categoryCode = ''
        switch (categoryValue){
            case 1:
                categoryCode = 'HER'
            case 2:
                categoryCode = 'MUE'
            case 3:
                categoryCode = 'MAQ'
            case 4:
                categoryCode = 'VEH'
            case 6:
                categoryCode = 'EC' 
        }
        return categoryCode
    }

    function submit(e) {
        programCode = getProgramCode(programHouseSelectedValue)
        categoryCode = getCategoryCode(categorySelectedValue)

        console.log('catego elegido', categoryCode);
        const errorsFromForm= validate(data)
        setFormErrors(errorsFromForm)
        setIsSubmit(true)
        if(!hasFormErrors(errorsFromForm)){
            Axios.post(url, {
            Name: data.Name,
            Description: data.Description==''? null:data.Description, // string
            EntryDate: data.EntryDate==''? null:data.EntryDate.split('T')[0], // dateTime
            Price: data.Price==''? null:parseFloat(data.Price).toFixed(2), // decimal
            Features: data.Features==''? null:data.Features, // string
            ProgramHouseId : programHouseSelectedValue,
            AssetCategoryId : categorySelectedValue,
            AssetStateId: stateSelectedValue, //string
            Code: "F-" + programCode + "-" + categoryCode + "-" + data.Code, //string
            }).then((res) => {
                if (res.status == 201) {               
                    navigate(`/activos-fijos`,{state:{showAlert:true,alertMessage:"Activo Fijo creado exitosamente"}})
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
            Code: '', // string
            Description: '', // string
            EntryDate: '', // dateTime
            Price: '', // decimal
            Features: '', // string
            ProgramHouseId : '', //int
            AssetCategoryId : '', //int
            AssetStateId: ''//string
        }
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
        if(!datas.Name){
            errors.Name="El Nombre del Activo Fijo es requerido!";
        }else if(datas.Name.length>60){
            errors.Name="El campo Nombre del Activo Fijo debe ser menor o igual a 60 caracteres!";
        }

        if(!datas.Code){
            errors.Code="El Código del Activo Fijo es requerido!";
        } else if(assetsCodes.includes(datas.Code)){
            errors.Code="El Código del Activo Fijo ya existe!";
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

        if(!programHouseSelectedValue){
            errors.ProgramHouseId= "El programa del Activo Fijo es requerido!";
        }

        if(!categorySelectedValue){
            errors.AssetCategoryId= "La categoría del Activo Fijo es requerida!";
        }

        if(!stateSelectedValue){
            errors.AssetStateId= "El estado del Activo Fijo es requerido!";
        }
    
        if(datas.Features.length>1000){
            errors.Features= "El campo de Características del Activo Fijo debe ser menor o igual a 1000 caracteres!";
        }
    
        return errors
    }
    

    if(error){
        return ErrorPage(error)
    }
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
        </Box>
        <div style={{display:'flex', justifyContent:'center'}}>
            <FormContainer title="Crear activo fijo">
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
                        <Dropdown 
                    name={"Estado"} 
                    id="estado-drop" 
                    options={stateOptions}                                         
                    selectedValue={stateSelectedValue}
                    setSelectedValue = {setStateSelectedValue}
                    helperText = "Seleccione un estado"
                    required                    
                    >                                        
                </Dropdown>   
                {formErrors.AssetStateId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetStateId}  </Alert>:<p></p> }
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
                    id="Code"
                    name="Code"
                    value={data.Code}
                    label="Código"
                    type="text"
                    onChange={(e) => {
                        handle(e)
                    }}
                />
                {formErrors.Code? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Code}                   
                </Alert>:<p></p> }
                <ButtonPrimary label={"Crear"} id="submit_button" onClick={submit}/>
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

export default CreateFixedAssetForm
