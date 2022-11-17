/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Collapse from '@mui/material/Collapse'
import ButtonPrimary, { ButtonSecondary } from '../../Components/MUI-Button';
import Alert from '@mui/material/Alert'
import SingleItemCard from '../../Components/SingleItemCard'
import { Box } from '@mui/system'


export function Profile() {
    let parseToken=parseJwt(sessionStorage.getItem("jwt") )
    const navigate = useNavigate()
    const userIdLogin  = parseToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    var url = 'https://ncv-api.herokuapp.com/api/auth/' + userIdLogin
    //var url = 'http://localhost:5009/api/auth/' + userIdLogin
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const fetchData = () => {
        var responseUser = axios(url)
        axios.all([responseUser]).then(
            axios.spread((...allData) => {
                var dataUser = allData[0].data
                setUser(dataUser)
            })
        )
    }
    const userData = {
        "NOMBRE": user.firstName,
        "APELLIDO": user.lastName,
        "CORREO": user.email,
        "ROL":user.rol,
        "CELULAR": user.cellPhone,
        
    }
    let imageUrl =
        'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg'
    
    const navigateEdit = () => { navigate(`/editar-perfil`); }

    useEffect(() => {
        fetchData()
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
           console.log(user);
        }
    }, [formErrors])
    console.log('user json: ', user)

<<<<<<< HEAD
=======

    function handleFormSubmit() {
        setFormErrors(validate(user));
        user.role=user.rol
        setIsSubmit(true)
        axios
            .put(url, user)
            .then(function (response) {
                if (response.status == 200) {
                    navigate(`/vista-usuarios`, {
                        state: {
                            //showAlert: true,
                            //alertMessage: 'Usuario editado correctamente'
                        }
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status >= 400|| error.response.status <= 500) 
                        setOpen(true)
                }
            })
    }

    function handleClose() {
        navigate(`/vista-usuarios`);
    }
>>>>>>> 6a6075d (Se modifico la vista de lista de usuarios)

    return (
        <>
            <Navbar />
            <div
                style={{
                    marginTop: '11vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' 
                }}
            >
                <SingleItemCard 
                title={user.firstName} 
                secondaryField={user.lastName} element={userData} imageUrl={imageUrl} 
                imageCirle={false} 
                imgHeight={300} imgWidth={500} />   
                <Box sx={{alignItems :'center'}}>
                <ButtonPrimary
                        label={'Editar'}
                        onClick={navigateEdit}
                        sx={{marginRight:1}}
                    />    
                <ButtonPrimary
                        label={'Cambiar Contrasena'}
                        //onClick={handleFormSubmit}
                        sx={{marginUp:1}}
                    />    
                    
                    
                    </Box> 
                
            </div>
        </>
    )
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    //debugger;
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
};
export default Profile
