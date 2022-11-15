import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import ButtonPrimary from '../../../Components/MUI-Button'
import InputText from '../../../Components/InputText'
import FormContainer from '../../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../../Components/NavBar';

const legalReport = {
    courtNumber: '',
    dna: '',
    nurej: '',
    legalProcesses: ''
}

function AddLegalReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/legalreports"

    const [formReport, setformReport] = useState(legalReport)
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
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte Legal creado"}});
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
            <FormContainer title="Reporte Legal">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Número de  Corte" es requerido'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="courtNumber"
                    name="courtNumber"
                    label="Número de Corte"
                    type="number"
                    value={formReport.courtNumber}
                    onChange={handleInputChange}
                />
                <InputText
                    id="dna"
                    name="dna"
                    label="DNA"
                    type="number"
                    helperText="Opcional"
                    value={formReport.dna}
                    onChange={handleInputChange}
                />
                <InputText
                    id="nurej"
                    name="nurej"
                    label="NUREJ"
                    type="number"
                    helperText="Opcional"
                    value={formReport.nurej}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="legalProcesses"
                    name="legalProcesses"
                    label="Procesos legales"
                    type="number"
                    helperText="Opcional"
                    value={formReport.legalProcesses}
                    onChange={handleInputChange}
                />
                <ButtonPrimary  label={"Crear reporte legal"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    )
}
export default AddLegalReport
