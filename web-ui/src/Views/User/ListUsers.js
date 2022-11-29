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
var accesPermiss = sessionStorage.getItem("Access")

function ListUsers() {
    const url = 'https://ncv-api.azurewebsites.net/api/auth'
    //const url="http://localhost:5009/api/auth";
    const { apiData: users, error } = getFromApi(url)

    const location = useLocation()
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
                elementUrl: `${completeInfoUser}/${el.id}`
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

        let registerUser = '/registrarse-ncv'

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
                        {usersComponents}
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
