import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary, ButtonPrimaryEditIcon} from '../../../Components/MUI-Button';
var accesPermiss = sessionStorage.getItem("Access")
function HealthReport({kidId, healthReport, healthReportStatusCode}){
    const navigate = useNavigate();
    const navigateEditHealthReport = () =>{ 
        let path = `/ninos/${kidId}/editar-reporte-salud`; 
        navigate(path);
    }
    let urlCreateHealthReport = `/ninos/${kidId}/crear-reporte/`
    let buttonCreateHealthReport = (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos de <b>salud</b></Typography>
            </Box>
            {((accesPermiss=="CompleteAccess") || (accesPermiss=="MediumAccess"))&&
                <ButtonPrimary key={2} label="Crear reporte de salud" onClick={()=>{navigate(urlCreateHealthReport)}} />
            }
            </Box>);
    let healthReportComponent = null
    if (healthReportStatusCode == 404){
        healthReportComponent = buttonCreateHealthReport
    }
    if (healthReport != null && healthReportStatusCode == 200){
        var healthReportElement = {
            "Tipo de Sangre" : healthReport.bloodType ,
            "CI Discapacitado" : healthReport.ciDiscapacidad ,
            "Diagnostico Psicológico" : healthReport.psychologicalDiagnosis ,
            "Diagnostico Neurologico" : healthReport.neurologicalDiagnosis ,
            "Diagnostico especial" : healthReport.specialDiagnosis ,
            "Problemas de salud" : healthReport.healthProblems ,
        }
        healthReportComponent = (<>
            <SingleItemCard key={1} element={healthReportElement} title={"Reporte de salud"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}} />
            {((accesPermiss=="CompleteAccess") || (accesPermiss=="MediumAccess"))&&<ButtonPrimaryEditIcon onClick={navigateEditHealthReport} sx={{alignSelf:'flex-end', left: '90%', background: '#5BCCD9', borderRadius: '50%', width: '50px', height: '50px'}}/>}
        </>)
    }
    return healthReportComponent
}

export default HealthReport;