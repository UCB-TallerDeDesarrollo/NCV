import Button from '../../Components/Button'

import Logo from '../../Components/Logo'
import Navbar from '../../Components/NavBar'

import './HomePage.css'

// uso de componentes

function HomePageForm() {
    /* Borrar cuando las vistas esten conectadas */
    /*const responsViewFile = () => {
        window.location.href = '/ninos'
    }
    const responsActivosFijos = () => {
        window.location.href = '/activos-fijos'
    }
     
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
    <div className="butonsHome">
                    <Button about={aboutButton} />
                    <Button about={aboutButtonB} />
                </div>
    */

    return (
        <><Navbar /><div style={{ marginTop: '15vh' }} className="homePageForm">
            <header className="App-header">
                <Logo />
                <h1 className="title">Niños con Valor org</h1>
                
            </header>
        </div></>
    )
}

export default HomePageForm
