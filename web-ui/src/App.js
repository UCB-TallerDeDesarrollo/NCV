import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageForm from './HomePageForm';
import CrearActivoFijoForm from './components/CrearActivoFijoForm';

function App(){
  return(
    <Router>
      <Routes>
        <Route path='/crear-activo-fijo' element={<CrearActivoFijoForm/>}></Route>
        <Route exact path='/' element={<HomePageForm/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;