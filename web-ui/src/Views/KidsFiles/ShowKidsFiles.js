import Box from '@mui/material/Box';
import ListGrid from '../../Components/ListGrid'
import { useState, useEffect } from 'react'
import { bgcolor } from '@mui/system';
import ListContainer from '../../Components/ListContainer';
import ListBasic from '../../Components/ListBasic';
import Navbar from '../../Components/NavBar';

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
                description:`CI: ${el.ci}`, 
                elementUrl:`${baseUrl}/${el.id}`,
                //imgSrc:`https://storage.needpix.com/rsynced_images/child-3003305_1280.jpg`
            }
        })
        kidsListComponent = <ListGrid items={listElements} />
    }
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            <ListContainer title="Niños del centro">
                {kidsListComponent}
            </ListContainer>
        </Box></>
    )
}
export default ShowKidsFiles
