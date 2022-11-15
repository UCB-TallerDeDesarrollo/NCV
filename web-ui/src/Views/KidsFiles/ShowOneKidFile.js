import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import axios from "axios";

import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

import Navbar from '../../Components/NavBar';
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../Components/MUI-Button';

import BasicData from '../../Views/KidsFiles/BasicDataReport/ShowBasicDataReport.js'
import HealthReport from '../../Views/KidsFiles/HealthReport/ShowHealthReport.js'
import WeightAndHeight from '../../Views/KidsFiles/HealthReport/BiometricsReport.js'
import LegalReport from '../../Views/KidsFiles/LegalReport/ShowLegalReport.js'

import TabsContainer from '../../Components/TabsContainer';

var accesPermiss = sessionStorage.getItem("Access")

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])

    const [healthReport, setHealthReport] = useState(null)
    const [healthReportStatusCode, setHealthReportStatusCode] = useState(null)

    const [biometrics, setBiometrics] = useState([])
    const [biometricsStatusCode, setBiometricsStatusCode] = useState(null)

    const [legalReport, setLegalReport] = useState(null)
    const [legalReportStatusCode, setLegalReportStatusCode] = useState(null)

    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/healthreports'
    const urlBiometrics = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/biometrics'
    const urlLegalKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/legalreports'

    const navigate = useNavigate();
    const navigateEditKid = () =>{ 
        let path = `/ninos/${kidId}/editar-nino`; 
        navigate(path);
    }
    const location = useLocation()
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);
    const [openToConfirm, setOpenToConfirm] = useState(false);

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlKid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
    )}

    const fetchHeltReport = () => {
        axios.get(urlHealthKid)
            .then((response) => {
                setHealthReportStatusCode(response.status)
                setHealthReport(response.data)
            })
            .catch((error)=>{
                setHealthReportStatusCode(error.response.status);
            })
    }

    const fetchDeleteKid = () => {
        axios.delete(urlKid)
        .then((response) => {
            if (response.status == 200){
                navigate(`/ninos`,{state:{showAlert:true,alertMessage:"Registro Eliminado"}})
            }
        })
        .catch(err=> console.log(err))
    }

    const fetchBiometrics = () => {
        axios.get(urlBiometrics)
            .then((response) => {
                setBiometricsStatusCode(response.status)
                setBiometrics(response.data)
            })
            .catch((error)=>{
                setBiometricsStatusCode(error.response.status);
            })
    }
    const fetchLegalReport = () => {
        axios.get(urlLegalKid)
            .then((response) => {
                setLegalReportStatusCode(response.status)
                setLegalReport(response.data)
            })
            .catch((error)=>{
                setLegalReportStatusCode(error.response.status);
            })
    }

    useEffect(() => { 
        fetchBasicData();
        fetchHeltReport();
        fetchBiometrics();
        fetchLegalReport();
    }, [])
    
    if (!kid){
        return <h1>ERROR: Niño no encontrado en la base de datos</h1>
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    function handleCloseToConfirm(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpenToConfirm(false)
    }
    const ToConfirmOpen = () => {
        handleCloseToConfirm();
        setOpenToConfirm(true);
    };
    let healthTabContent = (<HealthReport kidId={kidId} healthReport={healthReport} healthReportStatusCode={healthReportStatusCode}/>);
    let weightAndHeightTabContent = (<WeightAndHeight weightAndHeightData={biometrics} setBiometrics={setBiometrics}/>);
    let legalTabContent = (<LegalReport kidId={kidId} legalReport={legalReport} legalReportStatusCode={legalReportStatusCode}/>);
    return (
        <><Navbar /><div style={{ marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <BasicData kid={kid}/>
            {accesPermiss=="ComplitAcces"&&
                <ButtonPrimary label="Editar File" onClick={navigateEditKid}/>
            }
            <TabsContainer tabsNames={["Salud","Pesos y tallas","Legal"]} tabsContent={[healthTabContent,weightAndHeightTabContent,legalTabContent]}></TabsContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
            {accesPermiss=="ComplitAcces"&&
                <ButtonDanger key={2} label="Eliminar" id="delete_button" onClick={ToConfirmOpen} />
            }
            <Dialog open={openToConfirm} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
                <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar todos los datos de {kid.firstName + " " + kid.lastName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteKid}></ButtonDanger>
                </DialogActions>
            </Dialog>
        </div></>
    )}
export {ShowOneKidFile}
