import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import ListContainer from '../../Components/ListContainer'
import Navbar from '../../Components/NavBar'
import ButtonPrimary from '../../Components/MUI-Button'
import GutterList from '../../Components/GutterList'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TranslateRole from './Translate'
import SearchBar from '../../Components/SearchBar'
import { getListUsers } from './API/getAxios'
import DropdownListUser from '../../Components/DropdownListUser'
import DropdownList from '../../Components/DropdownList'
var accesPermiss = sessionStorage.getItem("Access")

function ListUsers() {
    const url = 'https://ncv-api.azurewebsites.net/api/auth'
    //const url="http://localhost:5009/api/auth";
    const { apiData: users, error } = getFromApi(url)

    const location = useLocation()
    const [openList, setOpenList] = useState(false);
    const [searchResult, setSearchResults] = useState([])
    let showAlert = location.state ? location.state.showAlert : false
    let alertMessage = location.state ? location.state.alertMessage : null
    const [open, setOpen] = useState(showAlert)
    const [usersList, setUsersList] = useState([])
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    function ordenCriteria(posts) {
        posts = posts.sort((a, b) => {
            return a.firstName
                .toLowerCase()
                .localeCompare(b.firstName.toLowerCase())
        })
        return posts
    }


    function searchCriteria(e, posts) {
        setOpenList(!openList)
        if (!e.target.value) return posts
        const resultsArray = posts.filter(
            (post) =>
                (
                    post.firstName.toLowerCase() +
                    ' ' +
                    post.lastName.toLowerCase()
                ).includes(e.target.value.toLowerCase()) ||
                TranslateRole(post.nameRole)
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                post.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                post.cellPhone
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
        )
        return resultsArray
    }
   

    useEffect(() => {
        getListUsers()
            .then((json) =>
                json.sort((a, b) => {
                    return a.firstName.localeCompare(b.firstName)
                })
            )
            .then((json) => {
                setUsersList(json)
                return json
            })
            .then((json) => {
                setSearchResults(json)
            })
    }, [])

    // const location = useLocation()
    const completeInfoUser = '/vista-usuarios'

    const navigate = useNavigate()
    if (error) {
        return ErrorPage(error)
    }
    if (!users) return null


    if (users.length > 0) {
        const listElements = searchResult.map((el) => {
            return {
                id: el.id,
                title: `${el.firstName} ${el.lastName}`,
                description: `${el.email} - ${el.cellPhone} - ${TranslateRole(
                    el.nameRole
                )}`,
                elementUrl: `${completeInfoUser}/${el.id}`,
                nameRole: `${TranslateRole(el.nameRole)}`
            }
        })

        let usersComponents = (
            <GutterList
                items={listElements}
                withImage={false}
                withDeleteIcon={true}
            />
        )
        const searcher = (
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'right',
                    justifyContent: 'center'
                }}
            >
                <SearchBar
                    posts={usersList}
                    setSearchResults={setSearchResults}
                    orderCriteria={ordenCriteria}
                    searchCriteria={searchCriteria}
                />
            </Box>
        )
        const roles = [
            {
                id:'1d0773b2-dc7d-454e-abb7-748fc394a1eb', 
                title:'Tia',
                description:``,
            },
            {
                id:'06ede763-edbe-4108-b315-7780e53fc6b1', 
                title:'Administrador',
                description:``,
            },
            {
                id:'03ce47ae-2cf7-4665-aea1-8f05976b0772', 
                title:'Soporte',
                description:``,
            },
            {
                id:'37689015-1c2d-4015-a88a-1088bd977098', 
                title:'Equipo Tecnico',
                description:``,
            },
            
        ]

        let registerUser = '/registrarse-ncv'
        let userRolComponent = <DropdownListUser itemsHeader={roles} itemsSubheader={listElements} isOpened={openList} withImage={false} withDeleteIcon={true} />
      
        const listHeaderComponents = (
            <Box sx={{ display: 'flex' }}>
                {searcher}
                {accesPermiss == 'CompleteAccess' && (
                    <ButtonPrimary
                        id="btn-register-user"
                        label={'Registrar Usuario'}
                        onClick={() => navigate(registerUser)}
                    />
                )}
            </Box>
        )

        return (
            <>
                <Navbar />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '15vh'
                    }}
                >
                    <ListContainer
                        title="Lista de usuarios"
                        header={listHeaderComponents}
                    >
                        {userRolComponent}
                        
                    </ListContainer>
                </Box>

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
export default ListUsers
