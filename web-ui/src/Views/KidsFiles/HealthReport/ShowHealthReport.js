import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../../Components/MUI-Button';

function HealthReport({kidId, healthReport, healthReportStatusCode}){
    const navigate = useNavigate();
    const navigateEditHealthReport = () =>{ 
        let path = `/ninos/${kidId}/editar-reporte-salud`; 
        navigate(path);
    }
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
    return <><>{healthReportComponent}</> <ButtonPrimary label="Editar Health Report" onClick={navigateEditHealthReport}/></>
}

export default HealthReport;