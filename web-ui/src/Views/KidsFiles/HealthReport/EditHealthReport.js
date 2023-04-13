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

const healtReport = {
    bloodType: '',
    ciDiscapacidad: '',
    psychologicalDiagnosis: '',
    neurologicalDiagnosis: '',
    specialDiagnosis: '',
    healthProblems: ''
}

const bloodtypes = [
    {
        value: 'O+',
        label: 'O+',
    },
    {
        value: 'O-',
        label: 'O-',
    },
    {
      value: 'A+',
      label: 'A+',
    },
    {
      value: 'A-',
      label: 'A-',
    },
    {
        value: 'B+',
        label: 'B+',
    },
    {
        value: 'B-',
        label: 'B-',
    },
    {
        value: 'AB+',
        label: 'AB+',
    },
    {
        value: 'AB-',
        label: 'AB-',
    }

  ];

function EditHealthReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlHealthReport = process.env.REACT_APP_BACKEND_URL + "/api/kids/"+ kidId +"/healthreports"
    const [healthRep, setHealthRep] = useState(healtReport)
    const [open, setOpen] = useState(false)

    const fetchHealthReportData = () => {
        var responseReporthealth = axios(urlHealthReport);
        axios.all([responseReporthealth]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setHealthRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchHealthReportData()
    }, [])
    console.log("health report json: ",healthRep )

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setHealthRep({
            ...healthRep,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlHealthReport, healthRep)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de salud actualizado correctamente"}});
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
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Salud sin modificaciones"}});
    }
    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar reporte de salud">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        Todos los campos son requeridos
                    </Alert>
                </Collapse>
                <InputText
                    required
                    select
                    id="bloodtype"
                    name="bloodType"
                    label="Grupo sanguineo"
                    type="text"
                    value={healthRep.bloodType}
                    onChange={handleInputChange}
                >
                {bloodtypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <InputText
                    id="ciDiscapacidad"
                    name="ciDiscapacidad"
                    label="CI de Discapacidad"
                    helperText="Opcional"
                    value={healthRep.ciDiscapacidad}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="psychologicalDiagnosis"
                    name="psychologicalDiagnosis"
                    label="Diagnostico Psicológico"
                    helperText="Opcional"
                    value={healthRep.psychologicalDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="neurologicalDiagnosis"
                    name="neurologicalDiagnosis"
                    label="Diagnostico Neurologico"
                    helperText="Opcional"
                    value={healthRep.neurologicalDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="specialDiagnosis"
                    name="specialDiagnosis"
                    label="Diagnostico Especial"
                    helperText="Opcional"
                    value={healthRep.specialDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    id="healthProblems"
                    name="healthProblems"
                    label="Problemas de Salud"
                    helperText="Opcional"
                    value={healthRep.healthProblems}
                    onChange={handleInputChange}
                />
                <Box sx={{display :'inline'}}>
                <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>     
                </Box>
            </FormContainer>
        </div></>
    );
}
export default EditHealthReport;
