import Box from '@mui/material/Box';
import ListGrid from '../../Components/ListGrid'
import { useState, useEffect } from 'react'
import ListContainer from '../../Components/ListContainer';
import Navbar from '../../Components/NavBar';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../../Components/MUI-Button';
import {useLocation} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import SearchBar from '../../Components/SearchBar';
import { getListKids } from './API/getAxios';

function ShowKidsFiles() {
    const [kidsList, setKidList] = useState([])
    const [searchResult, setSearchResults] = useState ([])
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

    function ordenCriteria(posts) {
        posts = posts.sort((a, b) => { return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())});
        return posts;
    }

    function searchCriteria (e, posts) {
        if (!e.target.value) return posts
        const resultsArray = posts.filter(post => post.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || post.lastName.toLowerCase().includes(e.target.value.toLowerCase()) || post.ci.toLowerCase().includes(e.target.value.toLowerCase()))
        return resultsArray;
    }

    useEffect(() => {
        getListKids().then(
            json => json.sort((a, b) => { return a.firstName.localeCompare(b.firstName)})
        ).then(json => {
            setKidList(json)
            return json
        }).then(json => {
            setSearchResults(json)
        })
    }, [])

    let kidsListComponent = null
    const baseUrl ="/ninos"
  
    if (kidsList.length>0){
        const listElements = searchResult.map((el)=>{
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
    const searcher = <SearchBar posts={kidsList} setSearchResults={setSearchResults} orderCriteria={ordenCriteria} searchCriteria={searchCriteria} />
    const newKidUrl = "/registrar-nino"
    const navigate = useNavigate();
    const listHeaderComponents = <ButtonPrimary label={"Registrar niño"} onClick={()=>navigate(newKidUrl)}/>
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>            
            <ListContainer title="Niños del centro" header={[searcher,listHeaderComponents]}>
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

export {ShowKidsFiles}
