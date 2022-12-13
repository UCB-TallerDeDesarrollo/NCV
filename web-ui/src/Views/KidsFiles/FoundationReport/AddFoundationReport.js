import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ButtonPrimary, { ButtonSecondary }  from '../../../Components/MUI-Button'
import InputText from '../../../Components/InputText'
import FormContainer from '../../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../../Components/NavBar';
import { Box } from '@mui/system';
import { getKidBasicInfo } from '../API/getAxios';
const foundReport = {
    admissionDate: '',
    admissionReason: '',
    admissionAge: ''
}

function AddFoundationReport() {
    const navigate = useNavigate();
    const {kidId} = useParams();
    var url = process.env.REACT_APP_BACKEND_URL + "/api/kids/" + kidId +"/foundationreport";
    var urlkid = process.env.REACT_APP_BACKEND_URL + "/api/kids/" + kidId;

    const [formReport, setformReport] = useState(foundReport);
    const [open, setOpen] = useState(false);
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

    useEffect(() => { 
        fetchBasicData();
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false);
        setAdmissionDateValitacion(false);
        setformReport({
            ...formReport,
            [name]: value
        })
    }

    function checkData(){
        console.log("Checking...");
        var check = true;
        if(formReport.admissionReason == ""){
            setOpen(true);
            check = false;
        }

        console.log("Checking date...");
        console.log(formReport.admissionDate); 
        if(formReport.admissionDate == ""){
            console.log(formReport.admissionDate);
            console.log(typeof(formReport.admissionDate));
            check = false;
            setAdmissionDateValitacion(true);
        } 

        var birthDayKid = kid.birthDate;
        var dateSelected = formReport.admissionDate;
        
        console.log(kid);
        console.log(birthDayKid);
        console.log(typeof(birthDayKid));
        console.log(birthDayKid);
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
        setOpen(false);
        if(checkData()){
            axios.post(url, formReport)
            .then(function (response) {
                if (response.status == 201){
                    navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Estancia creado"}});
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
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Estancia no creado"}});
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
                    value={formReport.admissionDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                />

                <Collapse in={admissionDateValitacion} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Fecha de Admision" es requerido y debe ser una fecha valida'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="AdmissionReason"
                    name="admissionReason"
                    label="Razon o Motivo de Admision"
                    type="text"
                    value={formReport.admissionReason}
                    onChange={handleInputChange}
                />
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Razon o Motivo de Admision" es requerido'}
                    </Alert>
                </Collapse>
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Crear reporte"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
            </FormContainer>
        </div></>
    )
}
export default AddFoundationReport
