import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ButtonPrimary , { ButtonSecondary } from '../../../Components/MUI-Button'
import InputText from '../../../Components/InputText'
import FormContainer from '../../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../../Components/NavBar';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

const familyReport = {
    siblingsInFoundation: null,
    siblingsOutside: null,
}

const booleansAnwers = [
    {
      value: true,
      label: 'SI',
    },
    {
      value: false,
      label: 'NO',
    }
  ];

function AddFamilyReport() {
    var familyReport_hasExtendedFamily;
    var familyReport_hasOriginFamily;
    var familyReport_copyIni = familyReport;

    const navigate = useNavigate();
    const {kidId} = useParams();
    var url = "https://ncv-api-dev.azurewebsites.net/api/kids/" + kidId +"/familyreports";

    const [formReport, setformReport] = useState(familyReport);
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setformReport({
            ...formReport,
            [name]: value
        })
    }
    
    function handleFormSubmit() {
        if(formReport == familyReport_copyIni){
            setOpen(true)
        }else{
        axios.post(url, formReport)
          .then(function (response) {
            if (response.status == 201){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Familia creado"}});
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
          });
        }
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Familia no creado"}});
    }
    

    return (
        <><Navbar /><div style={{marginTop: '3em', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de Familia">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'Al menos un datos debe ser llenado'}
                    </Alert>
                </Collapse>
                <InputText
                    id="siblingsInFoundation"
                    name="siblingsInFoundation"
                    label="Nro de Hermanos en el Centro"
                    type="number"
                    value={formReport.siblingsInFoundation}
                    onChange={handleInputChange}
                />
                <InputText
                    id="siblingsOutside"
                    name="siblingsOutside"
                    label="Nro de Hermanos externos"
                    type="number"
                    value={formReport.siblingsOutside}
                    onChange={handleInputChange}
                />
                <InputText
                    select
                    id="hasExtendedFamily"
                    name="hasExtendedFamily"
                    label="¿Tiene familia extendida?"
                    value={familyReport_hasExtendedFamily}
                    onChange={handleInputChange}
                >
                {booleansAnwers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <InputText
                    select
                    id="hasOriginFamily"
                    name="hasOriginFamily"
                    label="¿Tiene familia de origen?"
                    value={familyReport_hasOriginFamily}
                    onChange={handleInputChange}
                >
                {booleansAnwers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Crear reporte"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
            </FormContainer>
        </div></>
    )
}
export default AddFamilyReport
