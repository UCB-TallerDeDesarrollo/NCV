import SingleItemCard from '../../Components/SingleItemCard'
import { useState, useEffect } from 'react'

function Temp() {
    const [kidsList, setKidList] = useState([])
    const urlKids = 'https://ncv-api.herokuapp.com/api/kids/1'
    useEffect(() => {
        fetch(urlKids)
            .then((res) => res.json())
            .then(setKidList);
    }, [])
    /*let kidsListComponent = null
    const baseUrl ="/ninos/informacionpersonal"
    if (kidsList.length>0){
        const listElements = kidsList.map((el)=>{
            return {
                id:el.id, 
                title:`${el.firstName} ${el.lastName}`, 
                description:el.ci, 
                elementUrl:`${baseUrl}/${el.id}`
            }
        })
        kidsListComponent = <SingleItemCard items={listElements} />
    }*/
    return (
        <div>
            <SingleItemCard element={kidsList}/>
        </div>
    )
}
export default Temp
