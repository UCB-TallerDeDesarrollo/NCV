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
import Contacts from '../../Views/KidsFiles/Contacts/ContactsReport.js'
import FoundationReport from '../../Views/KidsFiles/FoundationReport/ShowFoundationReport.js';
import FamilyReport from '../../Views/KidsFiles/FamilyReport/ShowFamilyReport.js';
import EducationReport from '../../Views/KidsFiles/EducationReport/ShowEducationReport.js'

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


    const [contacts, setContacts] = useState([])
    const [contactsStatusCode, setContactsStatusCode] = useState(null)

    const [foundationReport, setFoundationReport] = useState(null)
    const [foundationReportStatusCode, setFoundationReportStatusCode] = useState(null)


    const [familyReport, setFamilyReport] = useState(null)
    const [familyReportStatusCode, setFamilyReportStatusCode] = useState(null)

    const [educationReport, setEducationReport] = useState(null)
    const [educationReportStatusCode, setEducationReportStatusCode] = useState(null)



    const urlKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId
    const urlHealthKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/healthreports'
    const urlBiometrics = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/biometrics'
    const urlCreateFoundationReport = `/ninos/${kidId}/crear-reporte-estancia/`
    const urlLegalKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/legalreports'
    const urlContacts = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/contacts'
    const urlFoundationReportKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/foundationreport'
    const urlFamilyReportKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/familyreports'
    const urlEducationKid = process.env.REACT_APP_BACKEND_URL + '/api/kids/'+ kidId +'/educationreports'

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


    const fetchContacts = () => {
        axios.get(urlContacts)
            .then((response) => {
                setContactsStatusCode(response.status)
                setContacts(response.data)
            })
            .catch((error)=>{
                setContactsStatusCode(error.response.status)});
    }

    const fetchFoundationReport = () => {
        axios.get(urlFoundationReportKid)
            .then((response) => {
                setFoundationReportStatusCode(response.status)
                setFoundationReport(response.data)
            })
            .catch((error)=>{
                setFoundationReportStatusCode(error.response.status);
            })
    }
    const fetchEducationReport = () => {
        axios.get(urlEducationKid)
            .then((response) => {
                setEducationReportStatusCode(response.status)
                setEducationReport(response.data)
            })
            .catch((error)=>{
                setEducationReportStatusCode(error.response.status);
            })
    }


    const fetchFamilyReport = () => {
        axios.get(urlFamilyReportKid)
            .then((response) => {
                setFamilyReportStatusCode(response.status)
                setFamilyReport(response.data)
            })
            .catch((error)=>{
                setFamilyReportStatusCode(error.response.status);
            })
    }

    useEffect(() => { 
        fetchBasicData();
        fetchHeltReport();
        fetchBiometrics();
        fetchLegalReport();
        fetchContacts();
        fetchFoundationReport();
        fetchFamilyReport();
        fetchEducationReport();
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
    let contactsTabContent = (<Contacts contactsData={contacts} setContacts={setContacts}/>);
    let foundationTabContent = (<FoundationReport kidId={kidId} foundationReport={foundationReport} foundationReportStatusCode={foundationReportStatusCode}/>);
    let familyTabContent = (<FamilyReport kidId={kidId} familyReport={familyReport} familyReportStatusCode={familyReportStatusCode}/>);
    let educationTabContent = (<EducationReport kidId={kidId} educationReport={educationReport} educationReportStatusCode={educationReportStatusCode}/>);
      
    return (
        <><Navbar /><div style={{ marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <BasicData kid={kid}/>
            <TabsContainer tabsNames={["Salud","Pesos y tallas","Legal","Educación","Contactos", "Estancia","Familia"]} tabsContent={[healthTabContent,weightAndHeightTabContent,legalTabContent,educationTabContent,contactsTabContent,foundationTabContent,familyTabContent]}></TabsContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
            {accesPermiss=="CompleteAccess"&&
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
        </div>
        </>
    )}
export {ShowOneKidFile}
