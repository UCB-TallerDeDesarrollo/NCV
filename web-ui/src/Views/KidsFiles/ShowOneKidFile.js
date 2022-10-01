import SingleItemCard from '../../Components/SingleItemCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BoxWithButton from '../../Components/BoxWithButton'

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])
    const [healthKid, sethealthKid] = useState([])
    var chechEmpty = "Empty";
    var hiddenElement = "block";
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/1/healthreports'

    const responsViewFormHelthReport = () => {
        window.location.href = '/add-reporte-nene/'+ kidId
    }

    var aboutButton = {
        texto: 'Añadir Reporte de Salud',
        nameClass: 'btn-healthReport',
        action: responsViewFormHelthReport,
        displey: 'block'
    }

    function Verificar(res){
        if(res.status == "404"){
            sethealthKid(["Empty"]);
        }else{
            sethealthKid(res.json());
        }
    }
    
    useEffect(() => {
        fetch(urlKid)
            .then((res) => res.json())
            .then(setKid);
    }, [])

    useEffect(() => {
        fetch(urlHealthKid)
            .then((res) => Verificar(res));
    }, [])
 
    // FIXME: Será necesario contemplar este caso ?? 
    // if (!kid) return null


    const MyKidDetails = { 
        "Nombre " : kid.firstName ,
        "Apellido ": kid.lastName ,
        "CI " : kid.ci, 
        "Fecha de Nacimiento ": kid.birthDate,
        "Programa de Casa " : kid.programHouse,
        "Lugar de Nacimiento ": kid.birthPlace,
        "Género ": kid.gender
    };

    if(healthKid == chechEmpty){
        aboutButton = {
            texto: 'Añadir Reporte de Salud',
            nameClass: 'btn-healthReport',
            action: responsViewFormHelthReport,
            displey: 'hidden'
        }
        hiddenElement = "none";
        console.log("Estoy Aca");
        console.log(hiddenElement);
    }

    var MyKidHealthReportDetails = {
        "Tipo de Sangre" : healthKid.bloodtype ,
        "CI Discapacitado" : healthKid.cIDiscapacidad ,
        "Diagnostico Fisico" : healthKid.psychologicalDiagnosis ,
        "Diagnostico Neurologico" : healthKid.neurologicalDiagnosis ,
        "Diagnostico especial" : healthKid.specialDiagnosis ,
        "Problemas de salud" : healthKid.healthProblems ,
    }

    return (
        <div>
            <SingleItemCard element={MyKidDetails} displayed="block"/>  
            <SingleItemCard element={MyKidHealthReportDetails} displayed={hiddenElement} /> 
            <BoxWithButton about={aboutButton}/>
        </div>
    )
}
export {ShowOneKidFile}
