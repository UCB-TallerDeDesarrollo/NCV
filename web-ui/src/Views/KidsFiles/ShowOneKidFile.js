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
import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

var accesPermiss = sessionStorage.getItem("Access")

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
    const options = { month: 'short', day: 'numeric'};
    var date  = new Date(jsonDateStr);
    return date.toLocaleDateString(undefined,options);
}

function formatDecimals(num){
    return num.toFixed(2);
}

const biometricsForm = {
    registerDate: "2018-07-22",
    weight: '',
    height: ''
}

function AddRowWeightAndHeight({setBiometrics}){
    let actualDate = new Date()
    biometricsForm.registerDate = actualDate.toJSON().split("T")[0]
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/biometrics"

    const [biometricsData, setbiometricsData] = useState(biometricsForm)
    const [open, setOpen] = useState(false)

    function handleFormSubmit() {
        let diffWithUTCTime = actualDate.getTimezoneOffset();
        actualDate.setMinutes(actualDate.getMinutes()-diffWithUTCTime);
        biometricsData.registerDate = actualDate.toJSON()
        console.log("Datos enviados: ", biometricsData)
        axios.post(url, biometricsData)
          .then(function (response) {
            if (response.status == 201){
                console.log("Datos biometricos agregados¡¡¡")
                axios.get(url)
                    .then((res) => {
                        setBiometrics(res.data)
                    })
                    .catch((e)=>{
                    })
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                // Esto que hace ??
                    setOpen(true)
            }
          });
          biometricsData.height = ''
          biometricsData.weight = ''
          biometricsData.registerDate = actualDate.toJSON().split("T")[0]
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setbiometricsData({
            ...biometricsData,
            [name]: value
        })
    }
    // {formatDate(actualDate)}
    return <div><TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                    {accesPermiss=="ComplitAcces"&&
                        <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={0} align={'center'} sx={{width:0.285}} >
                                <input
                                    placeholder="fecha..."
                                    name="registerDate"
                                    type="date"
                                    value={biometricsData.registerDate}
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={1} align={'center'}>
                                <input
                                    placeholder="peso..."
                                    name="weight"
                                    value={biometricsData.weight}
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="talla..."
                                    name="height"
                                    value={biometricsData.height}
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center' }}
                                ></input>
                            </TableCell>
                        </TableRow>
                    }
                </Table>
           </TableContainer>
           <Box sx={{pt: 3,display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                {accesPermiss=="ComplitAcces"&&
                    <ButtonPrimary key={2} label="Añadir datos" onClick={handleFormSubmit} />
                }
            </Box>
           </div>
}

function WeightAndHeight({weightAndHeightData,setBiometrics}){
    const [filteredBiometrics, setFilteredBiometrics] = useState([]);
    
    let availableYears = new Set([]);
    weightAndHeightData.slice().forEach((b)=>{
        availableYears.add(new Date(b["registerDate"]).getFullYear());
    })
    availableYears = Array.from(availableYears);
    
    useEffect(()=>{
        let fb = []
        let yearGroupIdx = 0;
        let yearGroup = availableYears[yearGroupIdx]
        fb.push({'groupTitle':yearGroup,'empty1':'','empty2':''})
        weightAndHeightData.slice().forEach((b)=>{
            if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                fb.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                yearGroupIdx+=1;
                yearGroup = availableYears[yearGroupIdx]
            }
            fb.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
        })
        setFilteredBiometrics(fb);
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
    const [yearsSelected, setYearsSelected] = useState([]);
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setYearsSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    useEffect(()=>{
        let fb = []
        let finalFilteredBiometrics = []
        if (yearsSelected.length > 0){
            fb = weightAndHeightData.filter((b)=>{
                var ans = false;
                let biometricYear = (new Date(b["registerDate"]).getFullYear())
                yearsSelected.forEach((y)=>{
                    ans = ans || y == biometricYear;
                })
                return  ans;
            })
            let yearGroup = fb.length > 0 ? (new Date(fb[0]["registerDate"]).getFullYear()) : undefined
            finalFilteredBiometrics.push({'groupTitle':yearGroup, 'empty1':'','empty2':''})
            fb.forEach((b)=>{
                if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                    finalFilteredBiometrics.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                    yearGroup = (new Date(b["registerDate"]).getFullYear())
                }
                finalFilteredBiometrics.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
            })
            setFilteredBiometrics(finalFilteredBiometrics)
        }
        else{
            //DUPLICATED CODE: TECH DEBT
            let yearGroupIdx = 0;
            let yearGroup = availableYears[yearGroupIdx]
            fb.push({'groupTitle':yearGroup,'empty1':'','empty2':''})
            weightAndHeightData.slice().forEach((b)=>{
                if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                    fb.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                    yearGroupIdx+=1;
                    yearGroup = availableYears[yearGroupIdx]
                }
                fb.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
            })
            setFilteredBiometrics(fb);
            //END OF DUPLICATED CODE
        }
    },[yearsSelected]);

    let yearComboBox = null;
    let weightAndHeightTitle = null;
    let columnNames = ["Fecha","Peso (Kg)","Talla (cm)"];
    let table = <>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                <AutoAwesomeIcon sx={{margin:2}}/>
                <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>peso y talla</b></Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row"}}>
            <TableBasic align='center' columnHeaders={columnNames} data={filteredBiometrics} sxTableContainer={{width:1}}></TableBasic>
        </Box>
    </>
    // let table = <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
    //     <AutoAwesomeIcon sx={{margin:2}}/>
    //     <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>peso y talla</b></Typography>
    // </Box>;
    
    if (weightAndHeightData != null && weightAndHeightData.length > 0){
        table = (<>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic align='center' columnHeaders={columnNames} data={filteredBiometrics} sxTableContainer={{width:1}}></TableBasic>
            </Box>
        </>);
        yearComboBox = (<FormControl sx={{ m: 1, minWidth: 100, justifySelf:'right', alignSelf:'end'}}>
            <InputLabel id="demo-multiple-checkbox-label">Año</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={yearsSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Año" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
            {availableYears.map((name) => (
                <MenuItem key={name} value={name}>
                <Checkbox checked={yearsSelected.indexOf(name) > -1} />
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
        <AddRowWeightAndHeight setBiometrics={setBiometrics}/>
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
        let completeAge = "";

        let years = actualYear - kidYear;
        let months = 0;
        let date = 0;

        if(actualMonth>=kidMonth){
            months = actualMonth - kidMonth;
        } else {
            years--;
            months = 12 + actualMonth - kidMonth; 
        }

        if(actualDate>=kidDate){
            date = actualDate - kidDate;
        } else {
            months--;
            date = 31 + actualDate - kidDate;
            if(months<0){
                months=11;
                years--;
            }
        }
        age={
            yearsAge:years,
            monthsAge:months,
            daysAge:date
        };

        if(age.yearsAge>0 && age.monthsAge>0){
            completeAge = `${age.yearsAge} años y ${age.monthsAge} meses`;
        }else if(age.yearsAge==0 && age.monthsAge==0 && age.daysAge>0){
            completeAge = `${age.daysAge} dias`;
        } else if(age.yearsAge==0 && age.monthsAge>0){
            completeAge = `${age.monthsAge} meses`;
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
            <SingleItemCard key={0} element={MyKidDetails} imageUrl={imageUrl} title={kid.firstName + " " + kid.lastName } itemsPerLine={3}/>
            {accesPermiss=="ComplitAcces"&&
                <ButtonPrimary label="Editar File" onClick={navigateEditKid}/>
            }
            <HealthReport kidId={kidId} healthReport={healthReport} healthReportStatusCode={healthReportStatusCode}/>
            <WeightAndHeight weightAndHeightData={biometrics} setBiometrics={setBiometrics}/>
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
                    <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={deleteKid}></ButtonDanger>
                </DialogActions>
            </Dialog>
        </div></>
    )}
export {ShowOneKidFile}
