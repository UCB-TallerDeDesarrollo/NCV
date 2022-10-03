import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputText from '../../Components/InputText'

const healtReport = {
    BloodType: '',
    CIDiscapacidad: '',
    PsychologicalDiagnosis: '',
    NeurologicalDiagnosis: '',
    SpecialDiagnosis: '',
    HealthProblems: ''
}

function AddHealthReport() {
    var id_url = window.location.pathname;
    id_url = id_url[id_url.length - 1];
    var url = "https://ncv-api.herokuapp.com/api/kids/" + id_url +"/healthreports"

    const [formReport, setformReport] = useState(healtReport)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformReport({
            ...formReport,
            [name]: value
        })
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formReport)
        }
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((res) => console.log(res));
        alert("Formulario subido!");
    }

    return (
        <div>
            FORMULARIO PARA AÑADIR REPORTE DE SALUD A NENE
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <InputText
                        required
                        id="bloodtype"
                        name="BloodType"
                        label="Tipo de Sangre"
                        type="text"
                        value={formReport.BloodType}
                        onChange={handleInputChange}
                    />

                    <InputText
                        required
                        id="CIDiscapacidad"
                        name="CIDiscapacidad"
                        label="CI Discapacidad"
                        type="text"
                        value={formReport.CIDiscapacidad}
                        onChange={handleInputChange}
                    />

                    <InputText
                        id="PsychologicalDiagnosis"
                        name="PsychologicalDiagnosis"
                        label="Diagnostico Fisico"
                        helperText="Opcional"
                        value={formReport.PsychologicalDiagnosis}
                        onChange={handleInputChange}
                    />

                    <InputText
                        id="NeurologicalDiagnosis"
                        name="NeurologicalDiagnosis"
                        label="Diagnostico Neurologico"
                        helperText="Opcional"
                        value={formReport.NeurologicalDiagnosis}
                        onChange={handleInputChange}
                    />

                    <InputText
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
                </div>

                <Button variant="text" onClick={handleFormSubmit}>
                    Guardar
                </Button>
            </Box>
        </div>
    )
}
export default AddHealthReport
