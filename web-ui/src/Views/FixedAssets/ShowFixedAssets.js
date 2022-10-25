/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import {getFixedAssets} from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'
import ListContainer from "../../Components/ListContainer"
import ListBasic from '../../Components/ListBasic'
import ButtonPrimary from '../../Components/MUI-Button';    
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import SearchBar from '../../Components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ShowFixedAssets() {
    const [open, setOpen] = useState(null);
    const [fixedAssets, setFixedAssets] = useState()
    const [searchResult, setSearchResults] = useState ([])

    const location = useLocation()
    const navigate = useNavigate();

    const completeInfoFixedAsset = '/activos-fijos'
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets/'
    
    let showAlert = location.state ? location.state.showAlert : false 
    let alertMessage = location.state ? location.state.alertMessage : null 
    
    function ordenCriteria(posts) {
        posts = posts.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase())});
        return posts;
    }

    function searchCriteria (e, posts) {
        if (!e.target.value) return posts
        console.log(e.target.value)
        const resultsArray = posts.filter(post => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
        return resultsArray;
    }

    useEffect(()=>{
        getFixedAssets(url).then(
            json => {
                setFixedAssets(json)
                setSearchResults(json)
            }
        )
        setOpen(showAlert)
    },[])

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    if (!fixedAssets) return null
    const searcher = <SearchBar posts={fixedAssets} setSearchResults={setSearchResults} orderCriteria={ordenCriteria} searchCriteria={searchCriteria} />
    
    if (fixedAssets.length>0){
        const listElements = searchResult.map((el)=>{
            return {
                id:el.id, 
                title:`${el.name}`, 
                description:`Programa: ${el.programHouseAcronym!=null&&el.programHouseAcronym!=""&&el.programHouseAcronym!=undefined?el.programHouseAcronym:"*Sin programa*"}`,                 
                elementUrl:`${completeInfoFixedAsset}/${el.id}`,
                imgSrc:`https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`                
            }
        })
        //console.log(listElements)
        let fixedAssetsComponent = <ListBasic items={listElements} withImage={false} />
        let nexFixedAsset = "/crear-activo-fijo"
        const listHeaderComponents = <ButtonPrimary label={"Crear activo fijo"} onClick={()=>navigate(nexFixedAsset)}/>
        return (
            <>
                <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                    <ListContainer title="Lista de activos fijos" header={listHeaderComponents}>
                        {searcher}
                        {fixedAssetsComponent}
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
}