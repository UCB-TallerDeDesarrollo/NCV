import ErrorPage from '../../Components/ErrorPage'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { ButtonDanger, ButtonSecondary,   } from '../../Components/MUI-Button';
import axios from "axios"
var accesPermiss = sessionStorage.getItem("Access")
import DropdownListUser from '../../Components/DropdownListUser'
import DropdownList from '../../Components/DropdownList'

function ListUsers() {
    const url = process.env.REACT_APP_BACKEND_URL + '/api/auth'
   // const url="http://localhost:5009/api/auth";

    const location = useLocation()
    const [openList, setOpenList] = useState(false);
    const [searchResult, setSearchResults] = useState([])
    //let showAlert = location.state ? location.state.showAlert : false
    let alertMessage = location.state ? location.state.alertMessage : null
    const [showAlert, setShowAlert] = useState(location.state ? location.state.showAlert : false)
    const [open, setOpen] = useState(showAlert)
    const [usersList, setUsersList] = useState([])
    const [userSelect, setUserSelect] = useState(0)
    const [openToConfirm, setOpenToConfirm] = useState(false)

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
   
    const fetchDeleteUSer = () => {  
        axios.delete(url + "/"+userSelect.id)
        .then(function (response) {
            if (response.status == 200){
                setShowAlert(true)
                setAlertMessage("Usuario Eliminado")
                setSeverity("success")
                setOpen(true)
                setOpenToConfirm(false)  
                navigate(`/vista-usuarios`,{state:{showAlert:true,alertMessage:"Usuario eliminado exitosamente"}})                                        
            }   
        })
        .catch(err=> {
            setErrorAssetStateDelete(err)     
            setOpenToConfirm(false)        
        })
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
    /*if (error) {
        return ErrorPage(error)
    }
    if (!users) return null*/


    if (searchResult.length > 0) {
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
        function handleClose(event, reason) {
            if (reason === 'clickaway') {            
                return
            }
            setOpen(false)        
        }
    
        function handleCloseToConfirm(event, reason) {
            if (reason === 'clickaway') {
                return
            }
            setOpenToConfirm(false)
        }
        const ToConfirmOpen = () => {
            handleCloseToConfirm();
            setOpenToConfirm(true);
        }
    
        let deleteAction = (id) => {
            setUserSelect(id)          
            handleCloseToConfirm()
            ToConfirmOpen()
        }         
    
        function handle(e) {
            const newData = { ...data }
            newData[e.target.id] = e.target.value
            setData(newData)
            setOpen(false)
        }
        let usersComponents = (
            <GutterList
                items={listElements}
                withImage={false}
                withDeleteIcon={true}
                deleteAction={deleteAction}
            />
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
                <Dialog open={openToConfirm} onClose={handleCloseToConfirm} id="confirmation_popup" sx={{borderRadius:3 }}>
                    <DialogTitle sx={{display:'flex', justifyContent:'center'}}>Eliminar</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Desea eliminar todos los datos de {userSelect.title}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <ButtonSecondary label="Cancelar" onClick={handleCloseToConfirm}></ButtonSecondary>
                        <ButtonDanger label="Eliminar" id="confirm_delete_button" onClick={fetchDeleteUSer}></ButtonDanger>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}
export default ListUsers
