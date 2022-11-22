/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import {getFixedAssets} from '../../Components/GetFromApi'
import getFromApi from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'
import ListContainer from "../../Components/ListContainer"
import ListBasic from '../../Components/ListBasic'
import DropdownList from '../../Components/DropdownList'
import Dropdown from '../../Components/Dropdown'
import ButtonPrimary from '../../Components/MUI-Button';    
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import SearchBar from '../../Components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { display } from '@mui/system'

export default function ShowFixedAssets() {
    const [open, setOpen] = useState(null);
    const [fixedAssets, setFixedAssets] = useState()
    const [searchResult, setSearchResults] = useState ([])
    const [hasErrorWithFetch, setHasErrorWithFetch] = useState(null)
    const [programHouseSelectedValue, setProgramHouseSelectedValue] = useState(0) 

    const location = useLocation()
    const navigate = useNavigate();
    
    const completeInfoFixedAsset = '/activos-fijos'
    //const urlProgramHouses = 'https://ncv-api.herokuapp.com/api/programHouses'
    //const url = 'https://ncv-api.herokuapp.com/api/fixedAssets/'
    //const urlCategories = 'https://ncv-api.herokuapp.com/api/assetCategories?showAssets=true'
    const urlProgramHouses = 'http://localhost:5009/api/programHouses'
    const url = 'http://localhost:5009/api/fixedAssets/'
    const urlCategories = 'http://localhost:5009/api/assetCategories?showAssets=true'
    let showAlert = location.state ? location.state.showAlert : false
    let alertMessage = location.state ? location.state.alertMessage : null
    const { apiData: assetCategories, errors } = getFromApi(urlCategories)
    const { apiData: programHouses, errorProgramHouses } = getFromApi(urlProgramHouses)
    const {currentProgramHouse, setCurrentProgramHouse } = getFromApi(null)
    const headerIndices = [];
    const getHeaderName = (i) => {
        switch (i) {
            case 1:
                return 'Equipos y herramientas';
            case 2:
                return 'Muebles y enseres';
            case 3:
                return 'Maquinaria';
            case 4:
                return 'Herramientas';
        }
    }
    function ordenCriteria(posts) {
        posts = posts.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase())});
        return posts;
    }

    function searchCriteria (e, posts) {
        if (!e.target.value) return posts
        let resultsArray = posts.filter(post => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
        if(acronymsList[programHouseSelectedValue] != null){
            resultsArray = resultsArray.filter(post => post.programHouseAcronym.includes(acronymsList[programHouseSelectedValue]))
        }
        return resultsArray;
    }
    useEffect(()=>{
        getFixedAssets(url).then(
            response => {
                if(response.name != "AxiosError"){
                    setFixedAssets(response.data)
                    setSearchResults(response.data)
                    return response
                }
                setHasErrorWithFetch(response)
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

    if (hasErrorWithFetch != null){
        return ErrorPage(hasErrorWithFetch)
    } 
    if (!fixedAssets || !assetCategories || !programHouses) return null
    const acronymsList = []
    programHouses.map( programHouse =>  {
        acronymsList.push(programHouse.acronym)
    }) 
    let idProgram = -1
    const programHousesList = programHouses.map( programHouse =>  { 
        idProgram++
        return{
        label: programHouse.acronym,
        value: idProgram      
    }}) 
    const searcher = <SearchBar posts={fixedAssets} setSearchResults={setSearchResults} orderCriteria={ordenCriteria} searchCriteria={searchCriteria} />
    if (fixedAssets.length>0 && assetCategories.length>0){
        const listCategories = assetCategories.map((el)=>{
            return {
                id:el.id, 
                title:`${el.category}`,
                description:``,
            }
        })
        const programDropdown = 
            <Dropdown 
                id="programa-drop" 
                options={programHousesList}
                selectedValue={programHouseSelectedValue}
                helperText = "Seleccione un programa"
                setSelectedValue = {setProgramHouseSelectedValue}
                required
                >                                        
            </Dropdown> 
        const listElements = searchResult.map((el)=>{
            return {
                id:el.id, 
                title: el.code ? `${el.name} #${el.code}` : `${el.name}`,
                description:`Programa: ${el.programHouseAcronym!=null&&el.programHouseAcronym!=""&&el.programHouseAcronym!=undefined?el.programHouseAcronym:"*Sin programa*"}`,      
                program: el.program,           
                elementUrl:`${completeInfoFixedAsset}/${el.id}`,
                imgSrc:`https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`,
                categoryId: el.assetTypeAssetCategoryId
            }
        })
        let assetCategoriesComponent = <DropdownList itemsHeader={listCategories} itemsSubheader={listElements} withImage={false} />
        let assetStatesView = "/activos-fijos/estados"
        let nexFixedAsset = "/crear-activo-fijo"
        const buttonsList = 
        <Box sx={{display:'flex'}}>
            <ButtonPrimary label={"Gestionar Estados"} onClick={()=>navigate(assetStatesView)}/>
            <ButtonPrimary sx={{marginLeft:1}} label={"Crear activo fijo"} onClick={()=>navigate(nexFixedAsset)}/>
        </Box>
        const searchComponents = 
        <Box sx={{display:'flex'}} marginTop={1}>
            {searcher}
            <Box sx={{display:'flex', flexDirection:'row', alignItems :'center'}}>
                {programDropdown}
            </Box>
        </Box>
        const listHeaderComponents =
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            {buttonsList}
            {searchComponents}
        </Box>

        return (
            <>
                <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                    <ListContainer title="Lista de activos fijos" header={listHeaderComponents}>
                        {assetCategoriesComponent}
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