import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import axios from "axios";
import Navbar from '../../Components/NavBar';
import SingleItemCard from '../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../Components/MUI-Button';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import TableBasic from '../../Components/TableBasic';
import Container from '../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function HealthReport({kidId, healthReport, healthReportStatusCode}){
    const navigate = useNavigate();
    let urlCreateHealthReport = `/ninos/${kidId}/crear-reporte/`
    let buttonCreateHealthReport = (<Container>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>No se registraron datos de <b>salud</b></Box>
            <ButtonPrimary key={2} label="Crear reporte de salud" onClick={()=>{navigate(urlCreateHealthReport)}} />
        </Box>
    </Container>);
    let healthReportComponent = null
    if (healthReportStatusCode == 404){
        healthReportComponent = buttonCreateHealthReport
    }
    if (healthReport != null && healthReportStatusCode == 200){
        var healthReportElement = {
            "Tipo de Sangre" : healthReport.bloodType ,
            "CI Discapacitado" : healthReport.ciDiscapacidad ,
            "Diagnostico Fisico" : healthReport.psychologicalDiagnosis ,
            "Diagnostico Neurologico" : healthReport.neurologicalDiagnosis ,
            "Diagnostico especial" : healthReport.specialDiagnosis ,
            "Problemas de salud" : healthReport.healthProblems ,
        }
        healthReportComponent = <SingleItemCard key={1} element={healthReportElement} title={"Reporte de salud"} />
    }
    return healthReportComponent
}

function WeightAndHeight({weightAndHeightData=[]}){
    let table = <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
        <AutoAwesomeIcon sx={{margin:2}}/>
        No existen registros de <b>peso y talla</b>
    </Box>;
    if (weightAndHeightData != null && weightAndHeightData.length > 0){
        let columnNames = ["Fecha","Peso (Kg)","Talla (cm)"];
        table = (<>
            <h4>Peso y talla</h4>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic columnHeaders={columnNames} data={weightAndHeightData} sxTableContainer={{width:1}}></TableBasic>
            </Box>
        </>);
    }
    return (<Container>
        {table}
    </Container>);
}

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])     
    const [healthReport, setHealthReport] = useState(null)
    const [healthReportStatusCode, setHealthReportStatusCode] = useState(null)
    const [biometrics, setBiometrics] = useState([])
    const [biometricsStatusCode, setBiometricsStatusCode] = useState(null)
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/healthreports'
    const urlBiometrics = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/biometrics'

    const navigate = useNavigate();
    const location = useLocation()
    
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);
    const [openConfirmed, setOpenConfirmed] = useState(showAlert);
    const [openToConfirm, setOpenToConfirm] = useState(showAlert);

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

    const deleteKid = () => {
        axios.delete(urlKid)
        .then(response)
    }

    const fetchBiometrics = () => {
        axios.get(urlBiometrics)
            .then((response) => {
                setBiometricsStatusCode(response.status)
                setBiometrics(response.data)
            })
            .catch((error)=>{
                setBiometricsStatusCode(error.response.status);
                setBiometrics(null);
            })
    }

    useEffect(() => { 
        fetchBasicData();
        fetchHeltReport();
        fetchBiometrics();
    }, [])

    // FIXME: Será necesario contemplar este caso ?? 
    // if (!kid) return null
    if (!kid){
        return <h1>ERROR: Niño no encontrado en la base de datos</h1>
    }

    let birthDate = new Date (kid.birthDate);
    let yeardOld = new Date().getFullYear() - birthDate.getFullYear();
    console.log("EDAD:  ------------",birthDate.getFullYear())
    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"

    const MyKidDetails = { 
        "Edad ": yeardOld ,
        "Genero ": kid.gender,
        "Carnet de Identidad (CI) " : kid.ci, 
        "Fecha de Nacimiento ": birthDate.toLocaleDateString(),
        "Programa de Casa " : kid.programHouse,
        "Lugar de Nacimiento ": kid.birthPlace,
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const navigateListKid = () =>{ 
        let path = `/ninos`; 
        navigate(path);
    }

    const confirmedOpen = () => {
        handleCloseToConfirm();
        setOpenConfirmed(true);
    };

    const ToConfirmOpen = () => {
        handleCloseToConfirm();
        setOpenToConfirm(true);
    };

    return (
        <><Navbar /><div style={{ marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <SingleItemCard key={0} element={MyKidDetails} imageUrl={imageUrl} title={kid.firstName + " " + kid.lastName }/>
            <HealthReport kidId={kidId} healthReport={healthReport} healthReportStatusCode={healthReportStatusCode}/>
            <WeightAndHeight weightAndHeightData={biometrics}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
            
            <ButtonDanger key={2} label="Eliminar Registro" id="delete_button" onClick={ToConfirmOpen} />
            <Dialog open={openToConfirm} onClose={handleCloseToConfirm} id="confirmation_popup">
            <DialogTitle>¿Seguro que desea eliminar el registro?</DialogTitle>
            <DialogActions>
            <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
            <ButtonDanger label="Si, Quiero Eliminar Registro" id="confirm_delete_button" onClick={confirmedOpen}></ButtonDanger>
            </DialogActions>
            </Dialog>
            
            <Dialog open={openConfirmed}>
            <DialogTitle>Registro Eliminado</DialogTitle>
            <DialogActions>
            <ButtonPrimary label="Volver a la lista principal" id="return_button" onClick={navigateListKid}></ButtonPrimary>
            </DialogActions>
            </Dialog>
        </div></>
    )}
export {ShowOneKidFile}
