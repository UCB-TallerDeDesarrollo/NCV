import React, { useEffect, useState } from 'react';
import InputText from './InputText';

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
        <form onSubmit={handleLoginForm}>
            <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3">
                            <InputText type="text" id="input-text-username" label="Username:" onChange={handleUsernameChange} />
                            <InputText type="password" id="input-text-password" label="Password:" onChange={handlePasswordChange} />
                        </div> 
                        <div class="modal-footer d-flex justify-content-center">
                            <input type="submit" value="Log-In" class="btn btn-default" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
     );
}

export default LoginForm;