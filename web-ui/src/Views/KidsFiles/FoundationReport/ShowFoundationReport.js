import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary , ButtonPrimaryEditIcon} from '../../../Components/MUI-Button';
var accesPermiss = sessionStorage.getItem("Access")


function FoundationReport({kidId, foundationReport, foundationReportStatusCode}){
    const navigate = useNavigate();
    function navigateEditFoundationReport(){
        let path = `/ninos/${kidId}/editar-reporte-fundacion`; 
            navigate(path);
    }
    let urlCreateFoundationReport = `/ninos/${kidId}/crear-reporte-estancia/`
    let buttonCreateFoundationReport = (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos de <b>estancia en la Fundación</b></Typography>
            </Box>
            <ButtonPrimary key={2} label="Crear reporte de Estancia" onClick={()=>{navigate(urlCreateFoundationReport)}} />
        </Box>);
    let foundationReportComponent = null
    if (foundationReportStatusCode == 404){
        foundationReportComponent = buttonCreateFoundationReport
    }
    if (foundationReport != null && foundationReportStatusCode == 200){
        var foundationReportElement = {
            "Fecha de Admisión" : foundationReport.admissionDate!=null? foundationReport.admissionDate.split('T')[0]:null,
            "Razón o motivo de admisión" : foundationReport.admissionReason ,
            "Edad al momento de admisión" : foundationReport.admissionAge ,
            "Tiempo total de su estancia" : foundationReport.timeInFoundation,
        }
        foundationReportComponent = <><SingleItemCard key={1} element={foundationReportElement} title={"Reporte de Estancia"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}} />
        {((accesPermiss=="CompleteAccess") || (accesPermiss=="MediumAccess"))&&<ButtonPrimaryEditIcon onClick={navigateEditFoundationReport} sx={{alignSelf:'flex-end', left: '90%', background: '#5BCCD9', borderRadius: '50%', width: '50px', height: '50px'}}/>}</>
    }
    return foundationReportComponent
}

export default FoundationReport;