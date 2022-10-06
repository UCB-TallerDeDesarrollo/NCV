import Box from '@mui/material/Box';
import ListGrid from '../../Components/ListGrid'
import { useState, useEffect } from 'react'
import { bgcolor } from '@mui/system';
import ListContainer from '../../Components/ListContainer';
import ListBasic from '../../Components/ListBasic';
import Navbar from '../../Components/NavBar';
import Button from '../../Components/MUI-Button'
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../../Components/MUI-Button';
import {useLocation} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import Collapse from '@mui/material/Collapse';

function ShowKidsFiles() {
    const [kidsList, setKidList] = useState([])
    const location = useLocation()
    
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    const [open, setOpen] = useState(showAlert);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }


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
    const newKidUrl = "/registrar-nino"
    const navigate = useNavigate();
    const listHeaderComponents = <ButtonPrimary label={"Registrar niño"} onClick={()=>navigate(newKidUrl)}/>
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
            <ListContainer title="Niños del centro" header={listHeaderComponents}>
                {kidsListComponent}
            </ListContainer>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alertMessage}
                </Alert>
        </Snackbar>
        </>
    )
}
export default ShowKidsFiles
