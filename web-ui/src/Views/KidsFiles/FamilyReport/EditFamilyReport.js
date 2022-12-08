import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import FormContainer from '../../../Components/FormContainer';
import InputText from '../../../Components/InputText';
import ButtonPrimary, { ButtonSecondary } from '../../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';
import { Box } from '@mui/system';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

const familyReport = {
    siblingsInFoundation: '',
    siblingsOutside: '',
    hasExtendedFamily: '',
    hasOriginFamily : ''
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


function EditFamilyReport() {
    var familyReport_hasExtendedFamily;
    var familyReport_hasOriginFamily;
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlFamilyReport = "https://ncv-api-dev.azurewebsites.net/api/kids/" + kidId +"/familyreports"
    const [familyRep, setFamilyRep] = useState(familyReport)
    const [open, setOpen] = useState(false)

    const fetchFamilyReportData = () => {
        var responseReportfamily = axios(urlFamilyReport);
        axios.all([responseReportfamily]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setFamilyRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchFamilyReportData()
    }, [])
    

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setFamilyRep({
            ...familyRep,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlFamilyReport, familyRep)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de familia actualizado correctamente"}});
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
          });
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de familia sin modificaciones"}});
    }
    
    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar reporte de familia">
                <InputText
                    id="siblingsInFoundation"
                    name="siblingsInFoundation"
                    label="Nro de Hermanos en el Centro"
                    type="number"
                    value={familyRep.siblingsInFoundation}
                    onChange={handleInputChange}
                />
                <InputText
                    id="siblingsOutside"
                    name="siblingsOutside"
                    label="Nro de Hermanos externos"
                    type="number"
                    value={familyRep.siblingsOutside}
                    onChange={handleInputChange}
                />
                <InputText
                    select
                    id="hasExtendedFamily"
                    name="hasExtendedFamily"
                    label="¿Tiene familia extendida?"
                    value={familyRep.hasExtendedFamily}
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
                    value={familyRep.hasOriginFamily}
                    onChange={handleInputChange}
                >
                {booleansAnwers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <Box sx={{display :'inline'}}>
                <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>     
                </Box>
            </FormContainer>
        </div></>
    );
}
export default EditFamilyReport;
