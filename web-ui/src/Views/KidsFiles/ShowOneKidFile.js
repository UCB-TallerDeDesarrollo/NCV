import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import axios from "axios";
import Navbar from '../../Components/NavBar';
import SingleItemCard from '../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../Components/MUI-Button';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function HealthReport({kidId, healthReport, healthReportStatusCode}){
    const navigate = useNavigate();
    let urlCreateHealthReport = `/ninos/${kidId}/crear-reporte/`
    let buttonCreateHealthReport = <ButtonPrimary key={2} label="Crear reporte de salud" onClick={()=>{navigate(urlCreateHealthReport)}} />
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


function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])     
    const [healthReport, setHealthReport] = useState(null)
    const [healthReportStatusCode, setHealthReportStatusCode] = useState(null)
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/healthreports'

    const location = useLocation()
    
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
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

    useEffect(() => { 
        fetchBasicData();
        fetchHeltReport() 
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
        "NOMBRE " : kid.firstName,
        "APELLIDO ": kid.lastName ,
        "CI " : kid.ci, 
        "EDAD ": yeardOld , 
        "FECHA DE NACIMIENTO ": birthDate.toLocaleDateString(),
        "PROGRAMA DE CASA " : kid.programHouse,
        "LUGAR DE NACIMIENTO ": kid.birthPlace,
        "GENERO ": kid.gender
    };

    const handleClickOpen = () => {
        setOpen(true);
      };

    return (
        <><Navbar /><div style={{ marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <SingleItemCard key={0} element={MyKidDetails} imageUrl={imageUrl} />
            <HealthReport kidId={kidId} healthReport={healthReport} healthReportStatusCode={healthReportStatusCode}/>
            
            <ButtonDanger key={2} label="Eliminar Registro" id="delete_button" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>¿Seguro que desea eliminar el registro?</DialogTitle>
            <DialogActions>
            <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
            <ButtonDanger label="Si, Quiero Eliminar Registro" onClick={handleClose}></ButtonDanger>
            </DialogActions>
        </Dialog>
        </div></>
    )}
export {ShowOneKidFile}
