/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import ButtonPrimary, { ButtonSecondary } from '../../Components/MUI-Button';
import SingleItemCard from '../../Components/SingleItemCard'
import { Box } from '@mui/system'


export function Profile() {
    let parseToken=parseJwt(sessionStorage.getItem("jwt") )
    const navigate = useNavigate()
    const userIdLogin  = parseToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    var url = process.env.REACT_APP_BACKEND_URL + '/api/auth/' + userIdLogin
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
    //deberia enviar el id mas para verificar a que usuario se le cambio la contraseña
    const userData = {
        "Nombre": user.firstName,
        "Apellido": user.lastName,
        "Correo": user.email,
        "Rol":user.rol,
        "Celular": user.cellPhone,
        
    }
    let imageUrl =
        'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg'
    
    const navigateEdit = () => { navigate(`/editar-perfil`); }
    const navigateChangePassword = () => { navigate(`/cambiar-contrasena`) }

    const buttonChangePassword = <ButtonPrimary 
        label={'Cambiar Contraseña'}
        onClick={navigateChangePassword}
        sx={{
            alignSelf:'flex-end' 
        }}
    /> 

    useEffect(() => {
        fetchData()
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
           console.log(user);
        }
    }, [formErrors])
    console.log('user json: ', user)


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
                    imgHeight={300} imgWidth={500}
                    button={buttonChangePassword} 
                />   
                <Box sx={{alignItems :'center'}}>
                    {false&&<ButtonPrimary
                            label={'Editar'}
                            onClick={navigateEdit}
                            sx={{marginRight:1}}
                        />}    
                    {false&&<ButtonPrimary
                            label={'Cambiar Contrasena'}
                            //onClick={handleFormSubmit}
                            sx={{marginUp:1}}
                        />  }      
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