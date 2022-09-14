import Button from './components/Button';
import CrearActivoFijoForm from './components/CrearActivoFijoForm';
import Logo from './components/Logo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './HomePage.css';

//uso de componentes

function HomePageForm() {
  /*Borrar cuando las vistas esten conectadas*/
  const responsViewFile = () =>{
    console.log("mostrar pagina de vista files")
  }
  const responsActivosFijos = () =>{
    window.location.href = "/crear-activo-fijo";
  }
  /* */
  const aboutButton = {
    texto:"Files",
    nameClass: "btn-files",
    action: responsViewFile
  }

  const aboutButtonB = {
    texto:"Activos Fijos",
    nameClass: "btn-activosFijos",
    action: responsActivosFijos
  }

  return (
    <div className="homePageForm">
      <header className="App-header">
        <Logo/>
        <h1 className='title'>Niños con Valor org</h1>
        <div className='butonsHome'>
              <Button about ={aboutButton} />
              <Button about ={aboutButtonB}/>
        </div>
      </header>
      
    </div>
  );
}

export default HomePageForm;
