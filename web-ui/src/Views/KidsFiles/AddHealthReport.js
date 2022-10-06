import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ButtonPrimary from '../../Components/MUI-Button'
import InputText from '../../Components/InputText'
import FormContainer from '../../Components/FormContainer'
import Navbar from '../../Components/NavBar';

const healtReport = {
    BloodType: '',
    CIDiscapacidad: '',
    PsychologicalDiagnosis: '',
    NeurologicalDiagnosis: '',
    SpecialDiagnosis: '',
    HealthProblems: ''
}

function AddHealthReport() {
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/healthreports"

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
        <><Navbar /><div style={{margin:'10px', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de salud">
                <InputText
                    display="inline"
                    required
                    id="bloodtype"
                    name="BloodType"
                    label="Grupo sanguineo"
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
                <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    )
}
export default AddHealthReport
