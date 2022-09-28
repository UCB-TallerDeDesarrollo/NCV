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
    if (kidsList.length>0){
        const listElements = kidsList.map((el)=>{
            return {id:el.id, title:`${el.firstName} ${el.lastName}`, description:el.ci}
        })
        kidsListComponent = <ListBasic items={listElements} listUrl="/ninos" />
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
