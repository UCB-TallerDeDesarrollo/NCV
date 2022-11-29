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
    grade: '',
    school: '',
    rude: ''
}


function EditEducationReport() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlEducationReport = "https://ncv-api.herokuapp.com/api/kids/"+ kidId +"/educationreports"
    const [educationRep, setHealthRep] = useState(educationReport)
    const [open, setOpen] = useState(false)

    const fetchEducationReportData = () => {
        var responseReporteducation = axios(urlEducationReport);
        axios.all([responseReporteducation]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setEducationRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchEducationReportData()
    }, [])
    console.log("education report json: ",educationRep )

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setEducationRep({
            ...educationRep,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlEducationReport, educationRep)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de educación actualizado correctamente"}});
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
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de educación sin modificaciones"}});
    }
    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar reporte de educación">
                <Collapse in={open} sx={{width:1, pt:2}}>
                </Collapse>
                <InputText
                    id="grade"
                    name="grade"
                    label="Grado"
                    type="text"
                    value={educationRep.grade}
                    onChange={handleInputChange}
                >
                </InputText>
                <InputText
                    id="school"
                    name="school"
                    label="Unidad Educativa"
                    type="text"
                    value={educationRep.school}
                    onChange={handleInputChange}
                />
                <InputText
                    id="rude"
                    name="rude"
                    label="RUDE"
                    type="text"
                    value={educationRep.rude}
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
export default EditEducationReport;
