import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom'
import HomePageForm from './Views/HomePage/HomePageForm'
import LoginForm from './Views/Login/LoginForm'

import CrearActivoFijoForm from './Views/FixedAssets/CrearActivoFijoForm'
import ShowFixedAssets from './Views/FixedAssets/ShowFixedAssets'
import { ShowFixedAsset } from './Views/FixedAssets/ShowOneFixedAsset'

import AddHealthReport from './Views/KidsFiles/AddHealthReport'
import ShowFilesForm from './Views/KidsFiles/ShowFilesForm'
import DataHealth from './Views/KidsFiles/DataHealth'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm />}></Route>
                <Route path="/home-ncv" element={<HomePageForm />}></Route>
                <Route
                    path="/crear-activo-fijo"
                    element={<CrearActivoFijoForm />}
                ></Route>
                <Route
                    path="/activos-fijos"
                    element={<ShowFixedAssets />}
                ></Route>
                
                <Route
                    path="/activos-fijos/:fixedAssetId"
                    element={<ShowFixedAsset />}
                ></Route>
                <Route path="/files-nenes" element={<ShowFilesForm />}></Route>
                <Route
                    path="/add-reporte-nene"
                    element={<AddHealthReport />}
                ></Route>
                <Route path="kidHealth" element={<DataHealth />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    )
}

export default App
