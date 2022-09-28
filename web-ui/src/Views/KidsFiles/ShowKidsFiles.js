import ListBasic from '../../Components/ListBasic'
import { useState, useEffect } from 'react'

function ShowKidsFiles() {
    const [kidsList, setKidList] = useState([])
    const urlKids = 'https://ncv-api.herokuapp.com/api/kids'
    useEffect(() => {
        fetch(urlKids)
            .then((res) => res.json())
            .then(setKidList);
    }, [])
    let kidsListComponent = null
    const baseUrl ="/ninos"
    if (kidsList.length>0){
        const listElements = kidsList.map((el)=>{
            return {
                id:el.id, 
                title:`${el.firstName} ${el.lastName}`, 
                description:el.ci, 
                elementUrl:`${baseUrl}/${el.id}`
            }
        })
        kidsListComponent = <ListBasic items={listElements} />
    }
    return (
        <div>
            <h3>Archivos de los niños</h3>
            {kidsListComponent}
            <p>Aqui vendria el component button que se debe implementar</p>
        </div>
    )
}
export default ShowKidsFiles
