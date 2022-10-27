import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import ButtonPrimary from '../../Components/MUI-Button'
import InputText from '../../Components/InputText'
import FormContainer from '../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../Components/NavBar';


const healtReport = {
    BloodType: '',
    CIDiscapacidad: '',
    PsychologicalDiagnosis: '',
    NeurologicalDiagnosis: '',
    SpecialDiagnosis: '',
    HealthProblems: ''
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

function AddHealthReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/healthreports"

    const [formReport, setformReport] = useState(healtReport)
    const [open, setOpen] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setformReport({
            ...formReport,
            [name]: value
        })
    }
    
    function handleFormSubmit() {
        axios.post(url, formReport)
          .then(function (response) {
            if (response.status == 201){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de salud creado"}});
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
          });
    }

    return (
        <><Navbar /><div style={{marginTop: '3em', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de salud">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Grupo sanguineo" es requerido'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    select
                    id="bloodtype"
                    name="BloodType"
                    label="Grupo sanguineo"
                    type="text"
                    value={formReport.BloodType}
                    onChange={handleInputChange}
                >
                {bloodtypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <InputText
                    id="CIDiscapacidad"
                    name="CIDiscapacidad"
                    label="CI de Discapacidad"
                    type="text"
                    value={formReport.CIDiscapacidad}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="PsychologicalDiagnosis"
                    name="PsychologicalDiagnosis"
                    label="Diagnostico Fisico"
                    helperText="Opcional"
                    value={formReport.PsychologicalDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="NeurologicalDiagnosis"
                    name="NeurologicalDiagnosis"
                    label="Diagnostico Neurologico"
                    helperText="Opcional"
                    value={formReport.NeurologicalDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="SpecialDiagnosis"
                    name="SpecialDiagnosis"
                    label="Diagnostico Especial"
                    helperText="Opcional"
                    value={formReport.SpecialDiagnosis}
                    onChange={handleInputChange}
                />
                <InputText
                    id="HealthProblems"
                    name="HealthProblems"
                    label="Problemas de Salud"
                    helperText="Opcional"
                    value={formReport.HealthProblems}
                    onChange={handleInputChange}
                />
                <ButtonPrimary  label={"Crear reporte"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    )
}
export default AddHealthReport
