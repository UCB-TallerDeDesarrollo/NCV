import Button from '../../Components/Button'

import Logo from '../../Components/Logo'
import Navbar from '../../Components/NavBar'

import './HomePage.css'

// uso de componentes

function HomePageForm() {
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
