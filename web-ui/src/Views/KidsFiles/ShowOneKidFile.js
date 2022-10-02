import SingleItemCard from '../../Components/SingleItemCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BoxWithButton from '../../Components/BoxWithButton'
import { GetFetch } from './GetFetch'

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])
    const [healthKid, sethealthKid] = useState([])
    const checkEmpty = 'none';
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/healthreports'

    const responsViewFormHelthReport = () => {
        window.location.href = '/add-reporte-nene/'+ kidId
    }

    var aboutButton = {
        texto: 'Añadir Reporte de Salud',
        nameClass: 'btn-healthReport',
        action: responsViewFormHelthReport,
        displey: 'block'
    }

    useEffect(async () => {
        await setKid(GetFetch(urlKid));
    }, [])

    useEffect(async () => {
        await sethealthKid(GetFetch(urlHealthKid));
    }, [])

    console.log("resultado de kid...");
    console.log(kid);
    console.log("resultado de report kid...");
    console.log(healthKid);
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

    if(healthKid == checkEmpty){
        aboutButton = {
            texto: 'Añadir Reporte de Salud',
            nameClass: 'btn-healthReport',
            action: responsViewFormHelthReport,
            displey: 'hidden'
        }
    }

    var MyKidHealthReportDetails = {
        "Tipo de Sangre" : healthKid.bloodtype ,
        "CI Discapacitado" : healthKid.cIDiscapacidad ,
        "Diagnostico Fisico" : healthKid.psychologicalDiagnosis ,
        "Diagnostico Neurologico" : healthKid.neurologicalDiagnosis ,
        "Diagnostico especial" : healthKid.specialDiagnosis ,
        "Problemas de salud" : healthKid.healthProblems ,
    }

    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
    let title = "Datos Personales"

    console.log(MyKidHealthReportDetails);

    return (
        <div>
            <SingleItemCard element={MyKidDetails} title={title} imageUrl={imageUrl} />  
            <SingleItemCard element={MyKidHealthReportDetails} title={title} /> 
            <BoxWithButton about={aboutButton}/>
        </div>
    )}
export {ShowOneKidFile}
