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
import { EditUser } from './Views/User/EditUser'

import CreateFixedAssetForm from './Views/FixedAssets/CreateFixedAssetForm'
import ShowFixedAssets from './Views/FixedAssets/ShowFixedAssets'
import { ShowFixedAsset } from './Views/FixedAssets/ShowOneFixedAsset'
import UpdateFixedAssetForm from './Views/FixedAssets/UpdateFixedAsset'
import ShowAssetStates from './Views/FixedAssets/AssetStates/ShowAssetStates'
import ShowAssetTypesByCategory from './Views/FixedAssets/AssetTypes/ShowAssetTypesByCategory'

import AddHealthReport from './Views/KidsFiles/HealthReport/AddHealthReport'
import AddFoundationReport from './Views/KidsFiles/FoundationReport/AddFoundationReport'
import AddFamilyReport from './Views/KidsFiles/FamilyReport/AddFamilyReport'
import { ShowKidsFiles } from './Views/KidsFiles/ShowKidsFiles'
import { ShowOneKidFile } from './Views/KidsFiles/ShowOneKidFile'
import AddKid from './Views/KidsFiles/BasicDataReport/AddKid'
import EditKid from './Views/KidsFiles/BasicDataReport/EditKid'
import EditHealthReport from './Views/KidsFiles/HealthReport/EditHealthReport'
import EditEducationReport from './Views/KidsFiles/EducationReport/EditEducationReport'

import AddLegalReport from './Views/KidsFiles/LegalReport/AddLegalReport'
import AddEducationReport from './Views/KidsFiles/EducationReport/AddEducationReport'

import ListUsers from './Views/User/ListUsers'
import Profile from './Views/User/Profile'
import EditProfile from './Views/User/EditProfile'

let accesPermiss=sessionStorage.getItem("Access") 
function App() {
    if(accesPermiss== "CompleteAccess"){
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginForm />}></Route>
                    <Route path="/inicio-ncv" element={<HomePageForm />}></Route>
                    <Route path="/registrarse-ncv" element={<CreateUser />}></Route>
                    <Route path="/perfil-ncv" element={<Profile />}></Route>
                    <Route path="/editar-perfil" element={<EditProfile />}></Route>
                    <Route path="/vista-usuarios" element={<ListUsers />}></Route>
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
                    <Route
                        path="activos-fijos/:fixedAssetId/editar-activo-fijo"
                        element={<UpdateFixedAssetForm />}
                    ></Route>
                    <Route
                        path="/activos-fijos/estados"
                        element={<ShowAssetStates />}
                    ></Route>
                    <Route
                        path="/activos-fijos/tipos-por-categoria"
                        element={<ShowAssetTypesByCategory />}
                    ></Route>
                    <Route
                        path="/vista-usuarios/:userId"
                        element={<EditUser />}
                    ></Route>
                    <Route path="/ninos" element={<ShowKidsFiles />}></Route>
                    <Route
                        path="/ninos/:kidId"
                        element={<ShowOneKidFile />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte/"
                        //element={<><NavBar/><AddHealthReport/></>}
                        element={<AddHealthReport />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte-estancia/"
                        //element={<><NavBar/><AddFoundationReport/></>}
                        element={<AddFoundationReport />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte-familia/"
                        element={<AddFamilyReport />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte-legal/"
                        element={<AddLegalReport />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/crear-reporte-education/"
                        element={<AddEducationReport />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/editar-nino"
                        element={<EditKid />}
                    ></Route>
                    <Route
                        path="ninos/:kidId/editar-reporte-salud"
                        element={<EditHealthReport/>}
                    ></Route>
                     <Route
                        path="ninos/:kidId/editar-reporte-educacion"
                        element={<EditEducationReport/>}
                    ></Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        )
    }
    else if(accesPermiss== "RestriccionAccess"){
        return(
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm />}></Route>
                <Route path="/inicio-ncv" element={<HomePageForm />}></Route>
                <Route path="/perfil-ncv" element={<Profile />}></Route>
                <Route path="/ninos" element={<ShowKidsFiles />}></Route>
                <Route path="/ninos/:kidId" element={<ShowOneKidFile />}></Route>
                <Route
                    path="ninos/:kidId/crear-reporte/"
                    //element={<><NavBar/><AddHealthReport/></>}
                    element={<AddHealthReport/>}
                ></Route>
                <Route
                    path="ninos/:kidId/crear-reporte-estancia/"
                    //element={<><NavBar/><AddFoundationReport/></>}
                    element={<AddFoundationReport/>}
                ></Route>
                <Route
                    path="ninos/:kidId/editar-nino"
                    element={<EditKid/>}
                ></Route>
                <Route
                    path="ninos/:kidId/editar-reporte-salud"
                    element={<EditHealthReport/>}
                ></Route>
                
                    <Route exact path="/" element={<LoginForm />}></Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>)
    }
    else {
        return(
        <Router>
                <Routes>
                    <Route exact path="/" element={<LoginForm />}></Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        )
    }
}

export default App
