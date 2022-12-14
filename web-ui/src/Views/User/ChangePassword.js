import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import FormContainer from '../../Components/FormContainer'
import {InputPassword} from '../../Components/InputText'
import Collapse from '@mui/material/Collapse'
import { ButtonLoading } from '../../Components/MUI-Button';

import Alert from '@mui/material/Alert'
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { faL } from '@fortawesome/free-solid-svg-icons'
import {parseJwt} from './basicFunctionUser'

function ChangePassword() {
    let parseToken = parseJwt(sessionStorage.getItem("jwt") )
    const navigate = useNavigate()
    const userIdLogin  = parseToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    var url = process.env.REACT_APP_BACKEND_URL+'/api/auth/ChangePass' 
    //var url = 'http://localhost:5009/api/auth/ChangePass'
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({
        "errorCheckPassword": {
            "hasError": false,
            "message": ""
        },
        "errorNewPassword":{
            "hasError": false,
            "message": ""
        }
    });
    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showVerifyPassword, setShowVerifyPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    
    
    const fetchData = () => {
        var responseUser = axios(url)
        axios.post([responseUser]).then(
            axios.spread((...allData) => {
                var dataUser = allData[0].data
                setUser(dataUser)
            })
            )
    }
        
    useEffect(() => {
        fetchData()
        console.log(error.errorCheckPassword.hasError)
        if (!error.errorCheckPassword.hasError && isSubmit){
            //console.log(user);
        }
    }, [error.errorCheckPassword.hasError])
    function handleSubmitChangePassword(event){
        //Send to the API the new password for the user
        event.preventDefault();
        if(newPassword != verifyPassword){
            setError({
                ...error,
                "errorNewPassword": {
                    "hasError": true,
                    "message": "Las contraseñas nuevas no coinciden"
                }
            });
            return;
        }
        const passwordChangeData = {
            CurrentPassword: password,
            NewPassWord: newPassword,
            VerifyNewPassWord: verifyPassword,
            IdUser:userIdLogin
        }
        setIsSubmit(true)
        axios
            .post(url, passwordChangeData)
            .then(function (response) {
                if (response.status == 200) {
                    navigate(`/perfil-ncv`, {
                        state: {
                            showAlert: true,
                            alertMessage: 'Contraseña cambiada correctamente'
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

    return ( 
        <>
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3em'
                }}
            >
                <FormContainer title='Cambiar Contraseña'>
                    <form onSubmit={handleSubmitChangePassword}>
                        <div className='form-align'>
                            <p>Ingresa tu contraseña actual para verificar tu identidad</p>
                            <InputPassword
                                type={showVerifyPassword ? "text" : "password"}
                                id="input-text-verify-password"
                                label="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                error={error.errorCheckPassword.hasError}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            edge="end"
                                        >
                                            {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <div>
                                {
                                    error.errorCheckPassword.hasError && 
                                    <Alert id="alert-bad-user" severity="error" sx={{margin: 4}}>
                                        {error.errorCheckPassword.message}
                                    </Alert>
                                }
                            </div>
                            <div>
                                <p>Ingrese su nueva contraseña: </p>
                                <div className="form-outline mb-4">
                                    <InputPassword
                                        type={showNewPassword ? "text" : "password"}
                                        id="input-text-new-password"
                                        label="Nueva contraseña"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        required
                                        error={error.errorNewPassword.hasError}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    onMouseDown={(event) => event.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <InputPassword
                                        type={showNewPassword ? "text" : "password"}
                                        id="input-text-new-password"
                                        label="Verificar contraseña"
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                        value={verifyPassword}
                                        required
                                        error={error.errorNewPassword.hasError}
                                    />
                                </div>
                            </div>
                            <div>
                                {
                                    error.errorNewPassword.hasError && 
                                    <Alert id="alert-bad-user" severity="error" sx={{margin: 4}}>
                                        {error.errorNewPassword.message}
                                    </Alert>
                                }
                            </div>
                            <div className="pt-1 m-1">
                                <ButtonLoading 
                                    id="input-verify-password" 
                                    label="Cambiar contraseña"
                                    loading={isLoading} 
                                    type="submit"                            
                                />  
                            </div>
                        </div>
                    </form>
                </FormContainer>
            </div>
        </>
    );
}



export default ChangePassword;