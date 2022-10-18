import React, { useState } from 'react'
import InputText from '../../Components/InputText'
import ButtonPrimary from '../../Components/MUI-Button';
import FormContainer from '../../Components/FormContainer'
import './LoginForm.css'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [hasAnError, sethasAnError] = useState(false);
    const [error, setErrors] = useState([]);

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleLoginForm(event) {
        event.preventDefault()
        const user = {
            email,
            password
        }
        
        fetch("https://ncv-api.herokuapp.com/api/auth/Login", {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'POST',
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.isSuccess) {
                console.log('logging successfully')
                // Seguridad por Java Web Token
                sessionStorage.setItem("jwt", data.token);
                var parseToken = parseJwt(data.token)
                var Role = parseToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                //showSecrectOptions(Role);
                sessionStorage.setItem('Role',Role)
                window.location.href = '/inicio-ncv'

            } else {
                if(data.error != null){
                    setErrors(data.errors.append(data.token));
                } else {
                    setErrors([data.token]);
                }                
                sethasAnError(true);
            }
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
            alert(error);
        })
        .finally(() => {
            setPassword("");
        });
    } 

    return (
        <div className='login-page'>
            <FormContainer className="login-card">
                <form onSubmit={handleLoginForm}>
                    <div className='form-align'>
                        <img
                            src="https://res.cloudinary.com/dfsv5wqsb/image/upload/c_scale,q_87,w_221/v1664990797/logo-ncv-removebg-preview_f5piiq.png"
                            alt="login form"
                            className="img-fluid iconCustom"
                        />

                        <h5 className="fw-normal mb-3 pb-3">
                            Ingresa con tu cuenta
                        </h5>
                        <div className="form-outline mb-4">
                            <InputText
                                type="text"
                                id="input-text-email"
                                label="E-mail"
                                inputProps={{ maxLength: 20 }}
                                onChange={handleEmailChange}
                                value={email}
                                required
                                error={hasAnError}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <InputText
                                type="password"
                                id="input-text-password"
                                label="Contraseña"
                                inputProps={{ maxLength: 15 }}
                                onChange={handlePasswordChange}
                                value={password}
                                required
                                error={hasAnError}
                            />
                        </div>
                        <div>
                            {hasAnError && <p style={{color: "red"}}> Usuario y/o Contraseña no validos</p>}
                        </div>
                        <div className="pt-1 mb-4">
                            <ButtonPrimary label={"Iniciar Sesion"} type="submit"/>
                        </div>
                    </div>
                </form>
            </FormContainer>
        </div>                    
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
export default LoginForm
