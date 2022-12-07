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
import axios from "axios"

function CreateFixedAssetForm(props) {
    const url = 'https://ncv-api.azurewebsites.net/api/fixedAssets'
    const urlProgramHouses = 'https://ncv-api.azurewebsites.net/api/programHouses'
    const urlCategories = 'https://ncv-api.azurewebsites.net/api/assetCategories'
    const urlStates = 'https://ncv-api.azurewebsites.net/api/assetStates'
    const urlResponsibles = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'

    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
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
        Location: '', //string
        ProgramHouseId : '', //int
        AssetCategoryId : '', //int
        AssetStateId: '', //string
        AssetResponsibleId: ''
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

    //responsibles
    const [responsibleSelectedValue, setResponsibleSelectedValue] = useState(null)
    const { apiData:responsibles, error:errorResponsibles } = getFromApi(urlResponsibles) 

    //types
    const [typeSelectedValue, setTypeSelectedValue] = useState(null)
    const [typesOptions, setTypesOptions] = useState([])

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
    console.log('categorias', categoriesOptions)

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

    //responsibles options for DROPDOWN
    if(errorResponsibles){
        return ErrorPage(errorResponsibles)
    }
    if (!responsibles) return null 
    let responsiblesList = responsibles.map( responsible =>  { return{
        label: responsible.name,
        value: responsible.id      
    }}) 
    const responsibleOptions = responsiblesList 

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
        if(!errorsFromForm.Name && !errorsFromForm.Description && !errorsFromForm.Price && !errorsFromForm.ProgramHouseId && !errorsFromForm.AssetCategoryId && !errorsFromForm.Code && !errorsFromForm.AssetStateId && !errorsFromForm.AssetResponsibleId &&!errorsFromForm.AssetTypeId){
            hasErrors = false
        }
        return hasErrors
    }

    function getTypesByCategory(id){
        const urlTypesByCategory = `https://ncv-api.azurewebsites.net/api/assetCategories/${id}/assetTypes`
        let types=null
        let errorTypes=null
        axios.get(urlTypesByCategory).then(            
            (res) => {          
                types = res.data
                let typesList = types.map( type =>  { return{
                    label: type.type,
                    value: type.id      
                }}) 
                setTypesOptions(typesList)
            }
        ).catch((e)=>{
            errorTypes=e
        })        
        if(errorTypes) return ErrorPage(errorTypes)
        if(types==null) return null        
    }

    function getAssetsCodes(){        
        const url = 'https://ncv-api.azurewebsites.net/api/fixedAssets/'
        getFixedAssets(url).then(
            response => {
                if(response.name != "AxiosError"){
                    response.data.map((el)=>{
                        var splitCode = el.code.split("-")
                        assetsCodes.push(splitCode[splitCode.length-1]);
                        return response;
                    })
                }
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
                break
            case 2:
                categoryCode = 'MUE'
                break
            case 3:
                categoryCode = 'MAQ'
                break
            case 4:
                categoryCode = 'EQC'
                break
            case 5:
                categoryCode = 'VEH' 
                break
        }
        return categoryCode
    }

    function submit(e) {
        programCode = getProgramCode(programHouseSelectedValue)
        categoryCode = getCategoryCode(categorySelectedValue)
        console.log('valor cat', categorySelectedValue)
        console.log('category code', categoryCode)

        const errorsFromForm= validate(data)
        setFormErrors(errorsFromForm)
        setIsSubmit(true)
        if(!hasFormErrors(errorsFromForm)){
            Axios.post(url, {
            Name: data.Name.trim(),
            Description: (data.Description=='' || data.Description==null) ? null:data.Description.trim(), // string
            EntryDate: data.EntryDate==''? null:data.EntryDate.split('T')[0], // dateTime
            Price: data.Price==''? null:parseFloat(data.Price).toFixed(2), // decimal
            Location: (data.Location=='' || data.Location==null) ? null:data.Location.trim(), // string
            ProgramHouseId : programHouseSelectedValue,
            AssetTypeId : typeSelectedValue,
            AssetStateId : stateSelectedValue, //string
            AssetResponsibleId : responsibleSelectedValue, //string
            Code: "F-" + programCode + "-" + categoryCode + "-" + data.Code.trim() //string
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
            Code: '',
            Description: '', // string
            EntryDate: '', // dateTime
            Price: '', // decimal
            ProgramHouseId : '', //int
            AssetCategoryId : '', //int
            AssetStateId: '', //string
            AssetResponsibleId: '', //string
            AssetTypeId : '' //int
        }
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
        const regexSpaces = /\s/g;
        if(!datas.Name){
            errors.Name="El Detalle del Activo Fijo es requerido!";
        }else if(!datas.Name.replace(regexSpaces, '').length){
            errors.Name="El campo Detalle del Activo Fijo no puede ser vacío";
        }else if(datas.Name.length>60){
            errors.Name="El campo Detalle del Activo Fijo debe ser menor o igual a 60 caracteres!";
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
            errors.Price= "El Valor del Activo Fijo es requerido!";
        }else if(datas.Price < 0){
            errors.Price= "El Valor del Activo Fijo debe ser un número positivo!";
        }else if(!regexNumber.test(datas.Price)){
            errors.Price= "El Valor del Activo Fijo debe ser ingresado en formato decimal!";
        }

        if(!programHouseSelectedValue){
            errors.ProgramHouseId= "El programa del Activo Fijo es requerido!";
        }

        if(!categorySelectedValue){
            errors.AssetCategoryId= "El tipo de Activo Fijo es requerido!";
        }

        if(!typeSelectedValue){
            errors.AssetTypeId= "El Tipo es requerido!";            
        }

        if(typesOptions.length==0){
            errors.AssetTypeId = `Seleccione el tipo de Activo Fijo para ver sus respectivos tipos`
        }

        if(!stateSelectedValue){
            errors.AssetStateId= "El Estado del Activo Fijo es requerida!";
        }

        if(!responsibleSelectedValue){
            errors.AssetResponsibleId= "El Responsable del Activo Fijo es requerido!";
        }

        console.log('errs',errors)
        return errors
    }
    

    if(error){
        //setOpen(true)
        return ErrorPage(error)
    }
    return (
        <><Navbar />
        <div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Crear activo fijo">
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Name"
                    name="Name"
                    value={data.Name}
                    label="Detalle"
                    type="text"
                />
                {formErrors.Name? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Name}                   
                </Alert>:<p></p> }
                <Dropdown 
                    name={"Tipo de Activo Fijo"} 
                    id="category-drop" 
                    options={categoriesOptions} 
                    helperText = "Seleccione un tipo de Activo Fijo" 
                    selectedValue={categorySelectedValue}
                    setSelectedValue = {setCategorySelectedValue}
                    onChangeF = {getTypesByCategory}
                    required
                    >                                       
                </Dropdown> 
                {formErrors.AssetCategoryId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetCategoryId}  </Alert>:<p></p> }  
                <Dropdown 
                    name={"Tipo"} 
                    id="type-drop" 
                    options={typesOptions} 
                    helperText = "Seleccione un Tipo" 
                    selectedValue={typeSelectedValue}
                    setSelectedValue = {setTypeSelectedValue}
                    required
                    >                                       
                </Dropdown> 
                {formErrors.AssetTypeId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetTypeId}  </Alert>:<p></p> }                              
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
                    onChange={(e) => handle(e)}
                    id="Price"
                    value={data.Price}
                    label="Valor"
                    type="number"
                />
                {formErrors.Price? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.Price}  </Alert>:<p></p> }
                <Dropdown 
                    name={"Programa"} 
                    id="programa-drop" 
                    options={programHousesOptions} 
                    helperText = "Seleccione un programa" 
                    selectedValue={programHouseSelectedValue}
                    setSelectedValue = {setProgramHouseSelectedValue}
                    required
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
                        <Dropdown 
                    name={"Responsable"} 
                    id="responsable-drop" 
                    options={responsibleOptions}                                         
                    selectedValue={responsibleSelectedValue}
                    setSelectedValue = {setResponsibleSelectedValue}
                    helperText = "Seleccione un responsable"
                    required                    
                    >                                        
                </Dropdown>   
                {formErrors.AssetResponsibleId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetResponsibleId}  </Alert>:<p></p> }                 
                <InputText
                    onChange={(e) => handle(e)}
                    id="Location"
                    value={data.Location}
                    label="Ubicación"
                    type="text"
                />
                <InputText
                    required
                    id="Code"
                    name="Code"
                    value={data.Code.trim()}
                    label="Código"
                    type="text"
                    onChange={(e) => {
                        handle(e)
                    }}
                />
                {formErrors.Code? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Code}                   
                </Alert>:<p></p> }
                <Box sx={{display: 'inline'}}>
                <ButtonPrimary label={"Crear"} id="submit_button" onClick={submit}/>
                </Box>
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
