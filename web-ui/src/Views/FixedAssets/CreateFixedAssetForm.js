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

function CreateFixedAssetForm(props) {
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    const urlProgramHouses = 'https://ncv-api.herokuapp.com/api/programHouses'
    const urlCategories = 'https://ncv-api.herokuapp.com/api/assetCategories'
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState({
        Name: '', // string
        Description: '', // string
        EntryDate: '', // dateTime
        Price: '', // decimal
        Features: '', // string
        Quantity: '', // int
        ProgramHouseId : '', //int
        AssetCategoryId : '' //int
    })
    //programHouses
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(null)
    const { apiData:programHouses, error:errorProgramHouses } = getFromApi(urlProgramHouses)    

    useEffect(()=>{
        // console.log(formErrors)
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
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        // console.log(newData)
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

    function submit(e) {
        e.preventDefault()
        // setFormErrors(validate(data)); 
        // setIsSubmit(true);
        Axios.post(url, {
            Name: data.Name,
            Description: data.Description==''? null:data.Description, // string
            EntryDate: data.EntryDate==''? null:data.EntryDate.split('T')[0], // dateTime
            Price: data.Price==''? null:parseFloat(data.Price).toFixed(2), // decimal
            Features: data.Features==''? null:data.Features, // string
            Quantity: data.Quantity==''? null:parseInt(data.Quantity), // int
            ProgramHouseId : programHouseSelectedValue,
            AssetCategoryId : categorySelectedValue
        }).then((res) => {
            if (res.status == 201) {               
                navigate(`/activos-fijos`,{state:{showAlert:true,alertMessage:"Activo Fijo creado exitosamente"}})
            }            
        }).catch ((apiError) => {
            setError(apiError) 
            checkError()                    
        })
    }

    const validate = (datas) => {
        // console.log(datas);
        const errors = {};
        const regexNumber = /^[0-9]+([.][0-9]+)?$/;
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
    
        if(!datas.Features){
            errors.Features= "El campo de Características del Activo Fijo debe ser menor o igual a 1000 caracteres!";
        }
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
                    onChange={(e) => handle(e)}
                    id="Name"
                    name="Name"
                    value={data.Name}
                    label="Nombre"
                    type="text"
                />
                {formErrors.Name? <Alert  sx={{ width: 1, pt: 1 }} severity="error"> 
                    {formErrors.Name}                          
                </Alert>:<p></p> }
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
                <InputText
                    onChange={(e) => handle(e)}
                    id="Description"
                    value={data.Description}
                    label="Descripción"
                    type="text"
                />
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
                    label="Precio"
                    type="number"
                />
                
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
                
                <InputText
                    onChange={(e) => handle(e)}
                    id="Features"
                    value={data.Features}
                    label="Características"
                    type="text"
                />
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Quantity"
                    value={data.Quantity}
                    label="Cantidad"
                    type="number"
                />
                <ButtonPrimary label={"Crear"} id="submit_button" onClick={submit}/>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Activo Fijo Creado
                    </Alert>
                </Snackbar>
            </FormContainer>
        </div>
        </>
    )
}

export default CreateFixedAssetForm
