import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary , ButtonPrimaryEditIcon} from '../../../Components/MUI-Button';
var accesPermiss = sessionStorage.getItem("Access")

const navigate = useNavigate();
function navigateEditEducationReport(){
    let path = `/ninos/${kidId}/editar-reporte-educacion`; 
        navigate(path);
}

function EducationReport({kidId, educationReport, educationReportStatusCode}){
    const navigate = useNavigate();
    let urlCreateEducationReport = `/ninos/${kidId}/crear-reporte-education/`
    let buttonCreateEducationReport = (<Container sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos para el <b>reporte de Educacion</b></Typography>
            </Box>
            <ButtonPrimary key={2} label="Crear reporte Educación" onClick={()=>{navigate(urlCreateEducationReport)}} />
        </Box>
    </Container>);
    let educationReportComponent = null
    if (educationReportStatusCode == 404){
        educationReportComponent = buttonCreateEducationReport
    }
    if (educationReport != null && educationReportStatusCode == 200){
        var educationReportElement = {
            "Grado" : educationReport.grade,
            "Unidad Educativa" : educationReport.school ,
            "RUDE" : educationReport.rude,
        }
        educationReportComponent = <><SingleItemCard key={1} element={educationReportElement} title={"Reporte Educación"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}/>
        {accesPermiss=="CompleteAccess"&&<ButtonPrimaryEditIcon onClick={navigateEditEducationReport} sx={{alignSelf:'flex-end', left: '90%', background: '#5BCCD9', borderRadius: '50%', width: '50px', height: '50px'}}/>}</>
    }
    return educationReportComponent
}

export default EducationReport;