import { useNavigate } from 'react-router-dom';
import Container from '../../../Components/Container';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';

import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, { ButtonDanger, ButtonSecondary , ButtonPrimaryEditIcon} from '../../../Components/MUI-Button';
var accesPermiss = sessionStorage.getItem("Access")

function checkBooleanValue(value){
    var new_value;
    if (value== true){
        new_value = "SI"
    }else if(value == false){
        new_value = "NO"
    }else{
        return new_value
    }
    return new_value
}

function navigateEditFamilyReport(){
    console.log("Editando...");
}

function FamilyReport({kidId, familyReport, familyReportStatusCode}){
    const navigate = useNavigate();
    let urlCreateFamilyReport = `/ninos/${kidId}/crear-reporte-familia/`
    let buttonCreateFamilyReport = (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
            <AutoAwesomeIcon sx={{marginTop:2}}/>
            <Box sx={{margin:3}}>
                <Typography variant="body2">No se registraron datos de <b> Familia</b></Typography>
            </Box>
            <ButtonPrimary key={2} label="Crear reporte" onClick={()=>{navigate(urlCreateFamilyReport)}} />
        </Box>);
    let familyReportComponent = null
    if (familyReportStatusCode == 404){
        familyReportComponent = buttonCreateFamilyReport
    }
    if (familyReport != null && familyReportStatusCode == 200){
        var familyReport_hasExtendedFamily = checkBooleanValue(familyReport.hasExtendedFamily);
        var familyReport_hasOriginFamily = checkBooleanValue(familyReport.hasOriginFamily);
        
        var familyReportElement = {
            "Nro de Hermanos en el Centro" : familyReport.siblingsInFoundation,
            "Nro de Hermanos externos" : familyReport.siblingsOutside ,
            "¿Tiene Familia Extendida?" : familyReport_hasExtendedFamily,
            "¿Tiene Familia de origen?" : familyReport_hasOriginFamily
        }
        familyReportComponent = <><SingleItemCard key={1} element={familyReportElement} title={"Reporte de Familia"} sx={{ p: 0 , pt: 0, m:0, width:1, borderRadius:0, border:0, boxShadow:0}} />
        {accesPermiss=="CompleteAccess"&&<ButtonPrimaryEditIcon onClick={navigateEditFamilyReport} sx={{alignSelf:'flex-end', left: '90%', background: '#5BCCD9', borderRadius: '50%', width: '50px', height: '50px'}}/>}</>
    }
    return familyReportComponent
}

export default FamilyReport;