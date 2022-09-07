import React, { useEffect, useState } from 'react';
import InputText from './InputText';
import '../styles.css';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(username);
        console.log(password);
    }, [username, password]);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleLoginForm(){

    }

    return (
        <section className="vh-100" style={{backgroundColor: "#023E73"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card cardCustom">
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://ayudaenaccion.org/uploads/2022/02/historias-para-ninos-que-educan-en-valores.jpg" alt="login form" className="img-fluid imageCustom"/>
                                </div>
                                <div className='col-md-6 col-lg-7 d-flex align-items-center'>
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLoginForm}>
                                        <img src="https://ninosconvalor.org.bo/wp-content/uploads/2020/01/NCV-Logos-Whites.png" alt="login form" className="img-fluid iconCustom"/>

                                            <h5 className="fw-normal mb-3 pb-3">Ingresa con tu cuenta</h5>

                                            <InputText type="text" id="input-text-username" label="Nombre de usuario:" onChange={handleUsernameChange} />
                                            <InputText type="password" id="input-text-password" label="Contraseña:" onChange={handlePasswordChange} />
                                            <div className="pt-1 mb-4">
                                                <input type="submit" value="Log-In" className="btn btn-dark btn-lg btn-block" />
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
     );
}

export default LoginForm;