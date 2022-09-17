import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HomePageForm from './HomePageForm'
import AddHealthReport from './AddHealthReport'
import CrearActivoFijoForm from './components/CrearActivoFijoForm'
import ShowFilesForm from './ShowFilesForm'
import LoginForm from './components/LoginForm'
import ShowFixedAssets from './components/ShowFixedAssets'
import DataHealth from './kidsFilesView/DataHealth'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/crear-activo-fijo' element={<CrearActivoFijoForm/>}></Route>
        <Route path='/activos-fijos' element={<ShowFixedAssets/>}></Route>
        <Route path='/files-nenes' element={<ShowFilesForm/>}></Route>
        <Route path='/home-ncv' element={<HomePageForm/>}></Route>
        <Route path='/add-reporte-nene' element={<AddHealthReport/>}></Route>
        <Route exact path='/' element={<LoginForm/>}></Route>
        <Route path="kidHealth" element={<DataHealth />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
