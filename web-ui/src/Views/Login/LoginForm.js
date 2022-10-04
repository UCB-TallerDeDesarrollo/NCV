import React, { useEffect, useState } from 'react'
import InputText from '../../Components/InputText'
import './styles.css'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [hasAnError, sethasAnError] = useState(false);
    const [errors, setErrors] = useState([]);

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
        })/**/
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#023E73' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card cardCustom">
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://ayudaenaccion.org/uploads/2022/02/historias-para-ninos-que-educan-en-valores.jpg"
                                        alt="login form"
                                        className="img-fluid imageCustom"
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLoginForm}>
                                            <img
                                                src="https://ninosconvalor.org.bo/wp-content/uploads/2020/01/NCV-Logos-Whites.png"
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
                                                    onChange={handleEmailChange}
                                                    //required
                                                    error={hasAnError}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <InputText
                                                    type="password"
                                                    id="input-text-password"
                                                    label="Contraseña"
                                                    onChange={handlePasswordChange}
                                                    //required
                                                    error={hasAnError}
                                                />
                                            </div>
                                            <div>
                                                {hasAnError && <p style={{color: "red"}}> Usuario y/o Contraseña no validos</p>}
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <input
                                                    type="submit"
                                                    value="Log-In"
                                                    className="btn btn-dark btn-lg btn-block"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
