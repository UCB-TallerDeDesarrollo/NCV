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
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos de <b>salud</b></Typography>
            </Box>
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

function formatDate(jsonDateStr){
    const options = { month: 'short', day: 'numeric', year:'numeric'};
    var date  = new Date(jsonDateStr);
    return date.toLocaleDateString(undefined,options);
}

function WeightAndHeight({weightAndHeightData}){
    const [filteredBiometrics, setFilteredBiometrics] = useState([]);
    useEffect(()=>{
        setFilteredBiometrics(
            weightAndHeightData.slice().map((b)=>{
                return {"registerDate":formatDate(b["registerDate"]), "weight":b["weight"], "height":b["height"]};
            })
        );
    },[weightAndHeightData]);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    let availableYears = new Set([]);
    weightAndHeightData.forEach(b => {
        availableYears.add(new Date(b["registerDate"]).getFullYear());
    });
    availableYears = Array.from(availableYears);
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    useEffect(()=>{
        setFilteredBiometrics(
            weightAndHeightData.filter((b)=>{
                var ans = false;
                let biometricYear = (new Date(b["registerDate"]).getFullYear())
                personName.forEach((y)=>{
                    ans = ans || y == biometricYear;
                })
                return  ans;
            }).map((b)=>{
                return {"registerDate":formatDate(b["registerDate"]), "weight":b["weight"], "height":b["height"]};
            })
        )
    },[personName]);

    let yearComboBox = null;
    let weightAndHeightTitle = null;
    let table = <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
        <AutoAwesomeIcon sx={{margin:2}}/>
        <Typography variant="body2">No existen registros de <b>peso y talla</b></Typography>
    </Box>;
    
    if (weightAndHeightData != null && weightAndHeightData.length > 0){
        let columnNames = ["Fecha","Peso (Kg)","Talla (cm)"];
        table = (<>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic columnHeaders={columnNames} data={filteredBiometrics} sxTableContainer={{width:1}}></TableBasic>
            </Box>
        </>);
        yearComboBox = (<FormControl sx={{ m: 1, minWidth: 100, justifySelf:'right', alignSelf:'end'}}>
            <InputLabel id="demo-multiple-checkbox-label">Año</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Año" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
            {availableYears.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>);
        weightAndHeightTitle = <Typography variant="h3" sx={{marginBottom:1.5}}>Peso y talla</Typography>;
    }
    return (<Container sx={{ display: 'flex', flexDirection:'column' }}>
        <Box sx={{ display: 'flex', flexDirection:'row', alignItems:'center',  justifyContent:'space-between'}}>
            {weightAndHeightTitle}
            {yearComboBox}
        </Box>
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
    const navigateEditKid = () =>{ 
        let path = `/ninos/${kidId}/editar-nino`; 
        navigate(path);
    }
    const location = useLocation()
    
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);
    const [openToConfirm, setOpenToConfirm] = useState(false);

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

    function getAge(){
        let actualYear = new Date().getFullYear();
        let actualMonth = new Date().getMonth()+1;
        let actualDate = new Date().getDate();
        let kidYear = birthDate.getFullYear();
        let kidMonth = birthDate.getMonth()+1;
        let kidDate = birthDate.getDate();
        let age = {};
        let completeAge = ``;
        let years = actualYear - kidYear;
        if(actualMonth>=kidMonth){
            let months = actualMonth - ki;
        }
        //let days = birthDate.getDate();
        //let completeAge = `${kidMonth} años y ${actualMonth} meses`
        if(kidYear>=1 && kidMonth==0){
            completeAge = `${kidMonth} años`
        }
        if(kidYear == 0){
            completeAge = `${kidMonth} meses`
            if(kidMonth==0){
                completeAge = `${kidMonth} dias`;
            }
        }
        return completeAge;
    }

    let birthDate = new Date (kid.birthDate);
    let yeardOld = getAge();
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
            <ButtonPrimary label="Editar File" onClick={navigateEditKid}/>
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
            <ButtonDanger label="Si, Quiero Eliminar Registro" id="confirm_delete_button" onClick={deleteKid}></ButtonDanger>
            </DialogActions>
            </Dialog>
        </div></>
    )}
export {ShowOneKidFile}
