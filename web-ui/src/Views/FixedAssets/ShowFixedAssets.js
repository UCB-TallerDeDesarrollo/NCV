/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'
import Navbar from '../../Components/NavBar'
import ListContainer from "../../Components/ListContainer"
import ListBasic from '../../Components/ListBasic'
import ButtonPrimary from '../../Components/MUI-Button';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListSubheader } from '@mui/material'

export default function ShowFixedAssets() {
    const location = useLocation()
    const navigate = useNavigate();
    const completeInfoFixedAsset = '/activos-fijos'
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    const urlCategories = 'https://ncv-api.herokuapp.com/api/assetCategories'
    let showAlert = location.state ? location.state.showAlert : false
    let alertMessage = location.state ? location.state.alertMessage : null
    const [open, setOpen] = useState(showAlert);
    const { apiData: fixedAssets, error } = getFromApi(url)
    const { apiData: assetCategories, errors2 } = getFromApi(urlCategories)
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
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    if (error) {
        return ErrorPage(error)
    }
    if (assetCategories) {
        assetCategories.map((cat) => {
            headerIndices.push(cat.category); //agregar los indices a la lista 
        })
    }
    if (!fixedAssets) return null
    if (fixedAssets.length > 0) {
        const listElements = fixedAssets.map((el) => {
            return {
                id: el.id,
                title: `${el.name}`,
                description: `Programa: ${el.programHouseAcronym != null && el.programHouseAcronym != "" && el.programHouseAcronym != undefined ? el.programHouseAcronym : "*Sin programa*"}`,
                elementUrl: `${completeInfoFixedAsset}/${el.id}`,
                imgSrc: `https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg`,
                categoryName: el.assetCategoryCategory
            }
        })
        const groups = listElements.reduce((groups, item) => {
            const group = (groups[item.categoryName] || []);
            group.push(item);
            groups[item.categoryName] = group;
            return groups;
        }, {});
        function getFixedAssetsComponent(category){
            return <ListBasic items={groups[category]} withImage={false} />
        }
        let fixedAssetsComponent = <ListBasic items={listElements} withImage={false} />
        let fixedAssetsComponentCat1 = <ListBasic items={groups["Equipos y Herramientas"]} withImage={false} />
        let fixedAssetsComponentCat2 = <ListBasic items={groups["Muebles y Enseres"]} withImage={false} />
        let fixedAssetsComponentCat3 = <ListBasic items={groups["Maquinaria"]} withImage={false} />
        let fixedAssetsComponentCat4 = <ListBasic items={groups["Herramientas"]} withImage={false} />
        let nexFixedAsset = "/crear-activo-fijo"
        const listHeaderComponents = <ButtonPrimary label={"Crear activo fijo"} onClick={() => navigate(nexFixedAsset)} />
        return (
            <>
                <Navbar /><Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15vh' }}>
                    <ListContainer title="Lista de activos fijos" header={listHeaderComponents}>
                        <ListSubheader sx={{ typography: { fontSize: 20, },}}>
                            {getHeaderName(1)}
                            {fixedAssetsComponentCat1}
                            {/* {getFixedAssetsComponent(getHeaderName(1))} */}
                        </ListSubheader>
                        <ListSubheader sx={{ typography: { fontSize: 20, },}}>
                            {getHeaderName(2)}
                            {fixedAssetsComponentCat2}
                        </ListSubheader>
                        <ListSubheader sx={{ typography: { fontSize: 20, },}}>
                            {getHeaderName(3)}
                            {/* {fixedAssetsComponentCat3} */}
                        </ListSubheader>
                        <ListSubheader sx={{ typography: { fontSize: 20, },}}>
                            {getHeaderName(4)}
                            {/* {fixedAssetsComponentCat4} */}
                        </ListSubheader>

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
