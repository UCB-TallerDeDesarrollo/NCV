import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary, ButtonPrimaryEditIcon } from '../../../Components/MUI-Button';
var accesPermiss = sessionStorage.getItem("Access")



function LegalReport({kidId, legalReport, legalReportStatusCode}){
    const navigate = useNavigate();
    function navigateEditLegalReport(){
        let path = `/ninos/${kidId}/editar-reporte-legal`; 
            navigate(path);
    }
    let urlCreateLegalReport = `/ninos/${kidId}/crear-reporte-legal/`
    let buttonCreateLegalReport = (<Container sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}>
        {(accesPermiss == "MediumAccess") || (accesPermiss == "CompleteAccess")&&
            <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                <AutoAwesomeIcon sx={{marginTop:2}}/>
                <Box sx={{margin:3}}>
                    <Typography variant="body2">No se registraron datos para el <b>reporte Legal</b></Typography>
                </Box>
                <ButtonPrimary key={2} label="Crear reporte legal" onClick={()=>{navigate(urlCreateLegalReport)}} />
            </Box>
        }
    </Container>);
    let legalReportComponent = null
    if (legalReportStatusCode == 404){
        legalReportComponent = buttonCreateLegalReport
    }
    if (legalReport != null && legalReportStatusCode == 200){
        var legalReportElement = {
            "Nro de Juzgado" : legalReport.courtNumber ,
            "DNA" : legalReport.dna ,
            "NUREJ" : legalReport.nurej ,
            "Procesos legales" : legalReport.legalProcesses
        }
        legalReportComponent = <><SingleItemCard key={1} element={legalReportElement} title={"Reporte Legal"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}}/>
        {((accesPermiss=="CompleteAccess") || (accesPermiss=="MediumAccess"))&&<ButtonPrimaryEditIcon onClick={navigateEditLegalReport} sx={{alignSelf:'flex-end', left: '90%', background: '#5BCCD9', borderRadius: '50%', width: '50px', height: '50px'}}/>}</>
    }
    return legalReportComponent
}

export default LegalReport;