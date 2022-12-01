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

const legalReport = {
    courtNumber: '',
    dna: '',
    nurej: '',
    legalProcesses: ''
}


function EditLegalReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlLegalReport = "https://ncv-api.azurewebsites.net/api/kids/"+ kidId +"/legalreports"
    const [legalRep, setLegalRep] = useState(legalReport)
    const [open, setOpen] = useState(false)

    const fetchlegalReportData = () => {
        var responseReportlegal= axios(urlLegalReport);
        axios.all([responseReportlegal]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setLegalRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchlegalReportData()
    }, [])

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setLegalRep({
            ...legalRep,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlLegalReport, legalRep)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte legal actualizado correctamente"}});
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
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte legal sin modificaciones"}});
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
                    value={legalRep.courtNumber}
                    onChange={handleInputChange}
                />
                <InputText
                    id="dna"
                    name="dna"
                    label="DNA"
                    helperText="Opcional"
                    value={legalRep.dna}
                    onChange={handleInputChange}
                />
                <InputText
                    id="nurej"
                    name="nurej"
                    label="NUREJ"
                    helperText="Opcional"
                    value={legalRep.nurej}
                    onChange={handleInputChange}
                />
                <InputText
                    multiline={true}
                    id="legalProcesses"
                    name="legalProcesses"
                    label="Procesos legales"
                    helperText="Opcional"
                    value={legalRep.legalProcesses}
                    onChange={handleInputChange}
                />
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
            </FormContainer>
        </div></>
    )
}
export default EditLegalReport
