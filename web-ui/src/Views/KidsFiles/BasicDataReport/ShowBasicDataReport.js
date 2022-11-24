import SingleItemCard from '../../../Components/SingleItemCard'
import ButtonPrimary, {ButtonPrimaryEditIcon} from '../../../Components/MUI-Button';

import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

var accesPermiss = sessionStorage.getItem("Access");

function getAge(birthDate){
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


function BasicData({kid} ){
    const {kidId} = useParams()
    let birthDate = new Date (kid.birthDate);
    let yeardOld = getAge(birthDate);
    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"

    const MyKidDetails = { 
        "Edad ": yeardOld ,
        "Genero ": kid.gender,
        "Carnet de Identidad (CI) " : kid.ci, 
        "Fecha de Nacimiento ": birthDate.toLocaleDateString(),
        "Programa de Casa " : kid.programHouse,
        "Lugar de Nacimiento ": kid.birthPlace,
    };

    const navigate = useNavigate();
    const navigateEditKid = () =>{ 
        let path = `/ninos/${kidId}/editar-nino`; 
        navigate(path);
    }
    let editButton = accesPermiss=="CompleteAccess" ? (<ButtonPrimaryEditIcon onClick={navigateEditKid} sx={{alignSelf:'flex-end'}}/>) : null
    return <SingleItemCard key={0} element={MyKidDetails} imageUrl={imageUrl} title={kid.firstName + " " + kid.lastName } itemsPerLine={3} button={editButton}/>
}

export default BasicData;