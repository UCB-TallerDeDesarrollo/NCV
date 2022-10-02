import SingleItemCard from '../../Components/SingleItemCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BoxWithButton from '../../Components/BoxWithButton'
import axios from "axios";

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])     
    const [healthKid, sethealthKid] = useState([])
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    const urlHealthKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId +'/healthreports'

    const responsViewFormHelthReport = () => {
        window.location.href = '/add-reporte-nene/'+ kidId
    }

    var aboutButton = {
        texto: 'Añadir Reporte de Salud',
        nameClass: 'btn-healthReport',
        action: responsViewFormHelthReport,
        display: 'inline-block'
    }

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlKid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
    )}

    const fetchHeltReportData = () => {
        var responseHRKid = axios(urlHealthKid);
        axios.all([responseHRKid]).then(
            axios.spread((...allData) => {
                var dataHRK = allData[0].data
                sethealthKid(dataHRK)
            })
    )}

    useEffect(() => { fetchBasicData();
        fetchHeltReportData() }, [])

    // FIXME: Será necesario contemplar este caso ?? 
    // if (!kid) return null

    console.log("revisando HR...");
    console.log(healthKid);
    if(healthKid.bloodType != null){
        console.log("Ocultando boton...");
        aboutButton = {
            texto: 'Añadir Reporte de Salud',
            nameClass: 'btn-healthReport',
            action: responsViewFormHelthReport,
            display: 'none'
        }
    }

    let imageUrl = "https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg"
    let title = "Datos Personales"


    const MyKidDetails = { 
        "Nombre " : kid.firstName ,
        "Apellido ": kid.lastName ,
        "CI " : kid.ci, 
        "Fecha de Nacimiento ": kid.birthDate,
        "Programa de Casa " : kid.programHouse,
        "Lugar de Nacimiento ": kid.birthPlace,
        "Género ": kid.gender
    };

    var MyKidHealthReportDetails = {
        "Tipo de Sangre" : healthKid.bloodType ,
        "CI Discapacitado" : healthKid.ciDiscapacidad ,
        "Diagnostico Fisico" : healthKid.psychologicalDiagnosis ,
        "Diagnostico Neurologico" : healthKid.neurologicalDiagnosis ,
        "Diagnostico especial" : healthKid.specialDiagnosis ,
        "Problemas de salud" : healthKid.healthProblems ,
    }

    console.log("Datos obtenidos...");
    console.log(MyKidHealthReportDetails);

    return (
        <div>
            <SingleItemCard element={MyKidDetails} title={title} imageUrl={imageUrl} />  
            <SingleItemCard element={MyKidHealthReportDetails} title={title} imageUrl={imageUrl}/> 
            <BoxWithButton about={aboutButton}/>
        </div>
    )}
export {ShowOneKidFile}
