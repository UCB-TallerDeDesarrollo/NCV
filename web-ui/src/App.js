import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import HomePageForm from './Views/HomePage/HomePageForm'
import LoginForm from './Views/Login/LoginForm'

import CreateFixedAssetForm from './Views/FixedAssets/CreateFixedAssetForm'
import ShowFixedAssets from './Views/FixedAssets/ShowFixedAssets'
import { ShowFixedAsset } from './Views/FixedAssets/ShowOneFixedAsset'

import AddHealthReport from './Views/KidsFiles/AddHealthReport'
import ShowKidsFiles from './Views/KidsFiles/ShowKidsFiles'
import {ShowOneKidFile} from './Views/KidsFiles/ShowOneKidFile'
import DataHealth from './Views/KidsFiles/DataHealth'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm />}></Route>
                <Route path="/home-ncv" element={<HomePageForm />}></Route>
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
                    path="/add-reporte-nene/:id"
                    element={<AddHealthReport />}
                ></Route>
                <Route path="/kidHealth/:id" element={<DataHealth />} /> 
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    )
}

export default App
