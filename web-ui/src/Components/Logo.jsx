import React, { Fragment } from 'react'
import imgNiñosConValor from '../Assets/img/logo-ncv.png'
//import imgNiñosConValor from '../Assets/img/mision-vision.png'
// El logo se encuentra en formato png, esta sin fondo
const Logo = (props) => {
    return (
        <Fragment>
            <img
                src={imgNiñosConValor}
                alt="Niños con Valor"
                className="logo-img"
            />
        </Fragment>
    )
}

export default Logo
