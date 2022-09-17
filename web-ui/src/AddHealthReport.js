import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const healtReport = {
  BloodType: '',
  CIDiscapacidad: '',
  PsychologicalDiagnosis: '',
  NeurologicalDiagnosis: '',
  SpecialDiagnosis: '',
  HealthProblems: ''
}

function AddHealthReport () {
  const url = 'https://ucb-tde-ninos-con-valor-api.herokuapp.com/api/kids/1/healthreports'

  const [formReport, setformReport] = useState(healtReport)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setformReport({
      ...formReport,
      [name]: value
    })
  }

  function handleFormSubmit (event) {
    event.preventDefault()
    console.log('Subiendo...')
    console.log(formReport)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formReport)
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
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
            <TextField
                required
                id="bloodtype"
                name="BloodType"
                label="Tipo de Sangre"
                type="text"
                value={formReport.BloodType}
                onChange={handleInputChange}
            />

            <TextField
                required
                id="CIDiscapacidad"
                name="CIDiscapacidad"
                label="CI Discapacidad"
                type="text"
                value={formReport.CIDiscapacidad}
                onChange={handleInputChange}
            />

            <TextField
                id="PsychologicalDiagnosis"
                name="PsychologicalDiagnosis"
                label="Diagnostico Fisico"
                helperText="Opcional"
                value={formReport.PsychologicalDiagnosis}
                onChange={handleInputChange}
            />

            <TextField
                id="NeurologicalDiagnosis"
                name="NeurologicalDiagnosis"
                label="Diagnostico Neurologico"
                helperText="Opcional"
                value={formReport.NeurologicalDiagnosis}
                onChange={handleInputChange}
            />

            <TextField
                id="SpecialDiagnosis"
                name="SpecialDiagnosis"
                label="Diagnostico Especial"
                helperText="Opcional"
                value={formReport.SpecialDiagnosis}
                onChange={handleInputChange}
            />

            <TextField
                id="HealthProblems"
                name="HealthProblems"
                label="Problemas de Salud"
                helperText="Opcional"
                value={formReport.HealthProblems}
                onChange={handleInputChange}
            />
        </div>

        <Button variant="text" onClick={handleFormSubmit}>Guardar</Button>
        </Box>
    </div>
  )
};
export default AddHealthReport
