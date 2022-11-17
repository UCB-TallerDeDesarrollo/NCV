import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../../Components/MUI-Button';

function FoundationReport({kidId, foundationReport, foundationReportStatusCode}){
    const navigate = useNavigate();
    let urlCreateFoundationReport = `/ninos/${kidId}/crear-foundation-report/`
    let buttonCreateFoundationReport = (<Container sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos para el <b>registro de estadia en la fundación</b></Typography>
            </Box>
            <ButtonPrimary key={2} label="Crear registro de estadia en Fundación" onClick={()=>{navigate(urlCreateFoundationReport)}} />
        </Box>
    </Container>);
    let foundationReportComponent = null
    if (foundationReportStatusCode == 404){
        foundationReportComponent = buttonCreateFoundationReport
    }
    if (foundationReport != null && foundationReportStatusCode == 200){
        var foundationReportElement = {
            "Campo 1": "Hola",
            "Campo 2": "Como tas"
            //"Court Number" : legalReport.courtNumber ,
        }
        foundationReportComponent = <SingleItemCard key={1} element={foundationReportElement} title={"Estadía en la Fundación"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}/>
    }
    return foundationReportComponent
}

export default FoundationReport;