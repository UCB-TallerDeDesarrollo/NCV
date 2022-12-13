import {viewsAcces} from './security';
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import LoginForm from './Views/Login/LoginForm'

let accesPermiss=sessionStorage.getItem("Access") 
let viewsPermissAcces =viewsAcces(accesPermiss)
function App() {
    if( viewsPermissAcces == null){
        return(
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm />}></Route>
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
        )
    }
    else{
        return(viewsPermissAcces)
    }

}

export default App
