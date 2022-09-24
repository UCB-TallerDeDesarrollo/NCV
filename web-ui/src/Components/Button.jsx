import React, { Fragment } from 'react'

const Button = ({ about }) => {
    return (
        <Fragment>
            <button className={about.nameClass} onClick={about.action}>
                {about.texto}
            </button>
        </Fragment>
    )
}

export default Button
