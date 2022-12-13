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
    var urlkid = process.env.REACT_APP_BACKEND_URL + "/api/kids/" + kidId;
    const [foundationRep, setFoundationRep] = useState(foundationReport)
    const [open, setOpen] = useState(false)
    const [admissionDateValitacion, setAdmissionDateValitacion] = useState(false)
    const [kid, setKid] = useState([]);

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlkid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
    )}

    const fetchFoundationReportData = () => {
        var responseReportfoundation = axios(urlFoundationReport);
        axios.all([responseReportfoundation]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setFoundationRep(dataBK)
            })
    )}

    useEffect(() => {
        fetchBasicData();
        fetchFoundationReportData();
    }, [])

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setFoundationRep({
            ...foundationRep,
            [name]:value
        })
    }

    function checkData(){
        console.log("Checking...");
        var check = true;
        if(foundationRep.admissionReason == ""){
            setOpen(true);
            check = false;
        }
        console.log("Checking date...");
        console.log(foundationRep.admissionDate);
        if(foundationRep.admissionDate == ""){
            console.log(foundationRep.admissionDate);
            console.log(typeof(foundationRep.admissionDate));
            check = false;
            setAdmissionDateValitacion(true);
        } 

        var birthDayKid = kid.birthDate;
        var dateSelected = foundationRep.admissionDate;
        
        console.log(kid);
        console.log(birthDayKid);
        console.log(typeof(birthDayKid));
        var birthYear = birthDayKid[0] + birthDayKid[1] + birthDayKid[2] + birthDayKid[3];
        var birthMonth = birthDayKid[5] + birthDayKid[6];
        var birthDay = birthDayKid[8] + birthDayKid[9];
        var selectedYear = dateSelected[0] + dateSelected[1] + dateSelected[2] + dateSelected[3];
        var selectedMonth = dateSelected[5] + dateSelected[6];
        var selectedDay = dateSelected[8] + dateSelected[9];

        console.log(birthYear + " " + birthMonth+ " " +birthDay);
        console.log(selectedYear + " " + selectedMonth+ " " +selectedDay);

        if( selectedYear < birthYear) {
            console.log("Seleccion de año posterior.");
            check = false;
        }else{
            if( selectedYear == birthYear && selectedMonth < (birthMonth)) {
                console.log("Seleccion de mes posterior.");
                check = false;
            }else{
                if( selectedYear == birthYear && selectedMonth == (birthMonth) && selectedDay < birthDay) {
                    console.log("Seleccion de dia posterior.");
                    check = false;
                }
            }
        }
        return check;
    }

    function handleFormSubmit() {
        setAdmissionDateValitacion(false);
        if(checkData()){
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
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de estancia en fundacion sin modificaciones"}});
    }
    
    return (
        <><Navbar /><div style={{marginTop: '3em', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de Estancia">
                
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
                <Collapse in={admissionDateValitacion} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Fecha de Admision" es requerido'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="AdmissionReason"
                    name="admissionReason"
                    label="Razon o Motivo de Admision"
                    type="text"
                    value={foundationRep.admissionReason}
                    onChange={handleInputChange}
                />
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Razon o Motivo de Admision" es requerido'}
                    </Alert>
                </Collapse>
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
            </FormContainer>
        </div></>
    )
}
export default EditFoundationReport