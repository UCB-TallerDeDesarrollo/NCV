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

const foundationReport = {
    admissionDate: '',
    admissionReason: '',
    admissionAge: ''
}


function EditFoundationReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlFoundationReport = process.env.REACT_APP_BACKEND_URL + "/api/kids/"+ kidId +"/foundationreport"
    const [foundationRep, setFoundationRep] = useState(foundationReport)
    const [open, setOpen] = useState(false)

    const fetchFoundationReportData = () => {
        var responseReportfoundation = axios(urlFoundationReport);
        axios.all([responseReportfoundation]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setHealthRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchFoundationReportData()
    }, [])

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setFoundationRep({
            ...foundationRep,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlFoundationReport, foundationRep)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de estancia en la fundacion actualizado correctamente"}});
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
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de estancia en fundacion sin modificaciones"}});
    }
    
    return (
        <><Navbar /><div style={{marginTop: '3em', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de Estancia">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Fecha de Admision" es requerido'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="AdmissionDate"
                    name="admissionDate"
                    label="Fecha de Admision"
                    type="date"
                    value={foundationRep.admissionDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="AdmissionReason"
                    name="admissionReason"
                    label="Razon o Motivo de Admision"
                    type="text"
                    value={foundationRep.admissionReason}
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
export default EditFoundationReport