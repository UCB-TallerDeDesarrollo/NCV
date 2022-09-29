import SingleItemCard from '../../Components/SingleItemCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ShowOneKidFile() {
    
    const { kidId } = useParams()
    const [kid, setKid] = useState([])
    const urlKid = 'https://ncv-api.herokuapp.com/api/kids/'+ kidId
    
    useEffect(() => {
        fetch(urlKid)
            .then((res) => res.json())
            .then(setKid);
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
    return (
        <SingleItemCard element={MyKidDetails}/>  
    )
}
export {ShowOneKidFile}
