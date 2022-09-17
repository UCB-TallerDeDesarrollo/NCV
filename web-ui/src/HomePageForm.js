import Button from './components/Button'
import CrearActivoFijoForm from './components/CrearActivoFijoForm'
import ShowFilesForm from './ShowFilesForm'
import Logo from './components/Logo'

import './HomePage.css'

// uso de componentes

function HomePageForm () {
  /* Borrar cuando las vistas esten conectadas */
  const responsViewFile = () => {
    window.location.href = '/files-nenes'
  }
  const responsActivosFijos = () => {
    window.location.href = '/activos-fijos'
  }
  /* */
  const aboutButton = {
    texto: 'Files',
    nameClass: 'btn-files',
    action: responsViewFile
  }

  const aboutButtonB = {
    texto: 'Activos Fijos',
    nameClass: 'btn-activosFijos',
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
  )
}

export default HomePageForm
