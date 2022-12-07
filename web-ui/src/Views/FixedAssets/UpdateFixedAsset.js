import React, { useState, useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorPage from '../../Components/ErrorPage'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Navbar from '../../Components/NavBar'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary, { ButtonSecondary } from '../../Components/MUI-Button'
import getFromApi from '../../Components/GetFromApi'
import Dropdown from '../../Components/Dropdown'
import {getFixedAssets} from '../../Components/GetFromApi'
import axios from "axios"
import { useParams } from 'react-router-dom'
function UpdateFixedAssetForm(props) {
    const {fixedAssetId} = useParams()
    var urlFixedAsset = `https://ncv-api.azurewebsites.net/api/fixedAssets/${fixedAssetId}`
    const url = 'https://ncv-api.azurewebsites.net/api/fixedAssets'
    const urlProgramHouses = 'https://ncv-api.azurewebsites.net/api/programHouses'
    const urlCategories = 'https://ncv-api.azurewebsites.net/api/assetCategories'
    const urlStates = 'https://ncv-api.azurewebsites.net/api/assetStates'
    const urlResponsibles = 'https://ncv-api.azurewebsites.net/api/assetResponsibles'

    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    //data
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [code, setCode] = useState(null)
    const [location, setLocation] = useState(null)

    const assetsCodes = []
    getAssetsCodes();
    let programCode = ''
    let categoryCode = ''
    const navigate = useNavigate()

    const fetchBasicData = () => {
        var responseFA = axios(urlFixedAsset);
        axios.all([responseFA]).then(
            axios.spread((...allData) => {
                var dataFA = allData[0].data
                setName(dataFA.name)
                setPrice(dataFA.price)
                setCode(dataFA.code)
                getTypesByCategory(dataFA.assetTypeAssetCategoryId,false)
                setCategorySelectedValue(dataFA.assetTypeAssetCategoryId)
                setProgramHouseSelectedValue(dataFA.programHouseId)
                setTypeSelectedValue(dataFA.assetTypeId)
                setStateSelectedValue(dataFA.assetStateId)
                setResponsibleSelectedValue(dataFA.assetResponsibleId)
                setLocation(dataFA.location)
            })
    )}

    //programHouses
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(null)
    const { apiData:programHouses, error:errorProgramHouses } = getFromApi(urlProgramHouses)    

    useEffect(()=>{
        if(!Object.keys(formErrors).length) fetchBasicData()
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

    function handleClose(event, reason) {
        navigate(`/activos-fijos/${fixedAssetId}`,{state:{showAlert:true,alertMessage:"Información sin modificaciones"}});
    }
    
    function checkError(){
        if(error){
            return ErrorPage(error)
        }
    }
    function hasFormErrors(errorsFromForm){        
        let hasErrors=true
        if(!errorsFromForm.Name && !errorsFromForm.Price && !errorsFromForm.ProgramHouseId && !errorsFromForm.AssetCategoryId && !errorsFromForm.Code && !errorsFromForm.AssetStateId && !errorsFromForm.AssetResponsibleId &&!errorsFromForm.AssetTypeId){
            hasErrors = false
        }
        return hasErrors
    }

    function getTypesByCategory(id, setTypeNull=true){
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
                if(setTypeNull) setTypeSelectedValue(null)
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
            case 2:
                categoryCode = 'MUE'
            case 3:
                categoryCode = 'MAQ'
            case 4:
                categoryCode = 'EQC'
            case 5:
                categoryCode = 'VEH' 
        }
        return categoryCode
    }

    function handleFormSubmit(e) {
        programCode = getProgramCode(programHouseSelectedValue)
        categoryCode = getCategoryCode(categorySelectedValue)
        const errorsFromForm= validate()
        setFormErrors(errorsFromForm)

        if(!hasFormErrors(errorsFromForm)){
            axios.put(urlFixedAsset, {
            Name: name.trim(),
            Price: price==''? null:parseFloat(price).toFixed(2), // decimal           
            Location: location==null? '':location.trim(), // string
            ProgramHouseId : programHouseSelectedValue,
            AssetTypeId : typeSelectedValue,
            AssetStateId: stateSelectedValue, //string
            AssetResponsibleId: responsibleSelectedValue,
            Code: "F-" + programCode + "-" + categoryCode + "-" + code.split('-').pop().trim(), //string
            }).then((res) => {
                if (res.status == 200) {               
                    navigate(`/activos-fijos/${fixedAssetId}`,{state:{showAlert:true,alertMessage:"Activo Fijo actualizado exitosamente"}})
                }            
            }).catch ((apiError) => {
                setError(apiError) 
                checkError()                    
            })
        }
    }

    function validate (){      
        const errors = {
            Name: '', // string
            Code: '',
            Price: '', // decimal
            ProgramHouseId : '', //int
            AssetCategoryId : '', //int
            AssetStateId: '', //string
            AssetResponsibleId:'',
            AssetTypeId : '', //int
        }
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
        const regexSpaces = /\s/g;
        if(!name){
            errors.Name="El Detalle del Activo Fijo es requerido!";
        }else if(!name.replace(regexSpaces, '').length){
            errors.Name="El campo Detalle del Activo Fijo no puede ser vacío";
        }else if(name.length>60){
            errors.Name="El campo Detalle del Activo Fijo debe ser menor o igual a 60 caracteres!";
        }
    
        if(!code){
            errors.Code="El Código del Activo Fijo es requerido!";
        } else if(assetsCodes.includes(code)){
            errors.Code="El Código del Activo Fijo ya existe!";
        }
    
        if(price==null){
            errors.Price= "El Valor del Activo Fijo es requerido!";
        }else if(price < 0){
            errors.Price= "El Valor del Activo Fijo debe ser un número positivo!";
        }else if(!regexNumber.test(price)){
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
            errors.AssetStateId= "El Estado del Activo Fijo es requerido!";
        }

        if(!responsibleSelectedValue){
            errors.AssetResponsibleId= "El Responsable del Activo Fijo es requerido!";
        }
        return errors
    }
    

    if(error){
        return ErrorPage(error)
    }
    
    return (
        <><Navbar />
        <div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar datos de activo fijo">
                <InputText
                    required
                    onChange={(e) => setName(e.target.value)}
                    id="Name"
                    name="Name"                    
                    value={name}
                    label="Detalle"
                    type="text"
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    required
                    >                                       
                </Dropdown> 
                {formErrors.AssetTypeId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetTypeId}  </Alert>:<p></p> }            
                <InputText
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    id="Price"
                    value={price}
                    label="Valor"
                    type="number"
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    required                    
                    >                                        
                </Dropdown>   
                {formErrors.AssetResponsibleId? <Alert sx={{ width: 1, pt: 1 }} severity="error"> 
                        {formErrors.AssetResponsibleId}  </Alert>:<p></p> }
                
                <InputText
                    onChange={(e) => setLocation(e.target.value)}
                    id="Location"
                    value={location}
                    label="Ubicación"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                <InputText
                    required
                    id="Code"
                    name="Code"
                    value={code == null ? code : code.split('-').pop().trim()}
                    label="Código"
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                {formErrors.Code? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Code}                   
                </Alert>:<p></p> }
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>
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

export default UpdateFixedAssetForm