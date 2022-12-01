import React, { useState } from 'react';

import Alert from '@mui/material/Alert'
import { Link } from '@mui/material';

import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import { ButtonLoading } from '../../Components/MUI-Button';

function RecoverPassword() {
    const [email, setEmail] = useState('');

    const [hasAnError, sethasAnError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmitSendEmailRecover(event){
        event.preventDefault()
        if(!validateEmail(email)){
            sethasAnError(true);
            return;
        }
    }

    function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    return ( 
        <div className='login-page'>
            <FormContainer className="login-card">
                <form onSubmit={handleSubmitSendEmailRecover}>
                    <h5 className="fw-normal mb-3 pb-3">
                        Ingresa tu E-Mail para recuperar tu contraseña
                    </h5>
                    <p>
                        Se le enviara un correo de confirmacion para recuperar su contraseña
                    </p>
                    <div className="form-outline mb-4">
                        <InputText
                            type="text"
                            id="input-text-email"
                            label="E-mail"
                            onChange={(e) => {setEmail(e.target.value)}}
                            value={email}
                            required
                            error={hasAnError}
                        />
                    </div>
                    <div>
                            {hasAnError && <Alert id="alert-bad-user" sx={{ width: 1, pt: 1 }} severity="error">El correo no es valido</Alert>}
                        </div>
                    <div className="pt-1 mb-4">
                        <ButtonLoading id="input-button-login" label="Enviar Correo" loading={isLoading} type="submit" />
                        <Link href='/' underline="hover" color="black">Volver al inicio de sesion</Link >  
                    </div>
                </form>
            </FormContainer>
        </div>
   
    );
}

export default RecoverPassword
;