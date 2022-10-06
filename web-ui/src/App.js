import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import HomePageForm from './Views/HomePage/HomePageForm'
import LoginForm from './Views/Login/LoginForm'
import CreateUser from './Views/User/CreateUser'

import CreateFixedAssetForm from './Views/FixedAssets/CreateFixedAssetForm'
import ShowFixedAssets from './Views/FixedAssets/ShowFixedAssets'
import { ShowFixedAsset } from './Views/FixedAssets/ShowOneFixedAsset'

import AddHealthReport from './Views/KidsFiles/AddHealthReport'
import ShowKidsFiles from './Views/KidsFiles/ShowKidsFiles'
import {ShowOneKidFile} from './Views/KidsFiles/ShowOneKidFile'
import DataHealth from './Views/KidsFiles/DataHealth'
import AddKid from './Views/KidsFiles/AddKid'

import NavBar from './Components/NavBar'
var Rol = sessionStorage.getItem("Role")

function App() {
    if(Rol=="Soporte" || Rol=="AdminUser" || Rol == "AuntUser"){
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginForm />}></Route>
                    <Route path="/inicio-ncv" element={<HomePageForm />}></Route>
                    <Route path="/registrarse-ncv" element={<CreateUser />}></Route>
                    <Route path="/registrar-nino" element={<AddKid />}></Route>
                    <Route
                        path="/crear-activo-fijo"
                        element={<CreateFixedAssetForm />}
                    ></Route>

                    <Route
                        path="/activos-fijos"
                        element={<ShowFixedAssets />}
                    ></Route>

                    <Route
                        path="/activos-fijos/:fixedAssetId"
                        element={<ShowFixedAsset />}
                    ></Route>
                    <Route path="/ninos" element={<ShowKidsFiles />}></Route>
                    <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte/"
                        //element={<><NavBar/><AddHealthReport/></>}
                        element={<AddHealthReport/>}
                    ></Route>
                    <Route path="/kidHealth/:id" element={<DataHealth />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        )
    }
    else{
        return(
        <Router>
                <Routes>
                    <Route exact path="/" element={<LoginForm />}></Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
        </Router>)
    }
}

export default App
