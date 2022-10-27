/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Collapse from '@mui/material/Collapse'
import ButtonPrimary from '../../Components/MUI-Button'
import Alert from '@mui/material/Alert'
import { useParams } from 'react-router-dom'

const roles = [
    {
        label: 'Tia',
        value: 'AuntUser'
    },
    {
        label: 'Administrador',
        value: 'AdminUser'
    },
    {
        label: 'Super Usuario',
        value: 'SuperUser'
    }
]

export function EditUser() {
    const navigate = useNavigate()
    //const userId = '4cf62dc7-5e67-46fa-a227-f8dae70cba5a'
    const { userId } = useParams()
    var url = 'https://ncv-api.herokuapp.com/api/auth/' + userId
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const fetchData = () => {
        var responseUser = axios(url)
        axios.all([responseUser]).then(
            axios.spread((...allData) => {
                var dataUser = allData[0].data
                setUser(dataUser)
            })
        )
    }

    useEffect(() => {
        fetchData()
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit){
           console.log(user);
        }
    }, [formErrors])
    console.log('user json: ', user)

    const validate = (datas) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!datas.firstName) {
            errors.firstName = 'El nombre es requerido!'
        }

        if (!datas.lastName) {
            errors.lastName = 'El apellido es requerido!'
        }

        if (!datas.cellPhone) {
            errors.cellPhone = 'El celular es requerido!'
        }

        if (!datas.email) {
            errors.email = 'El correo es requerido!'
        } else if (!regex.test(datas.email)) {
            errors.email = 'Formato de correo incorrecto!'
        }

        return errors
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleFormSubmit() {
        setFormErrors(validate(user));
        setIsSubmit(true)
        axios
            .put(url, user)
            .then(function (response) {
                if (response.status == 200) {
                    navigate(`/vista-usuarios`, {
                        state: {
                            //showAlert: true,
                            //alertMessage: 'Usuario editado correctamente'
                        }
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status >= 400|| error.response.status <= 500) 
                        setOpen(true)
                }
            })
    }

    return (
        <>
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '3em'
                }}
            >
                <FormContainer title="Editar usuario">
                    <Collapse in={open} sx={{ width: 1, pt: 2 }}>
                        <Alert severity="error">
                            Todos los campos son requeridos
                        </Alert>
                    </Collapse>

                    <InputText
                        required
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={user.firstName}
                        onChange={handleInputChange}
                    />
                    {formErrors.firstName ? (
                        <Alert sx={{ width: 1, pt: 1 }} severity="error">
                            {formErrors.firstName}
                        </Alert>
                    ) : (
                        <p></p>
                    )}
                    <InputText
                        required
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                    {formErrors.lastName ? (
                        <Alert sx={{ width: 1, pt: 1 }} severity="error">
                            {formErrors.lastName}
                        </Alert>
                    ) : (
                        <p></p>
                    )}
                    <InputText
                        required
                        id="cellPhone"
                        name="cellPhone"
                        type="number"
                        value={user.cellPhone}
                        onChange={handleInputChange}
                    />
                    {formErrors.cellPhone ? (
                        <Alert sx={{ width: 1, pt: 1 }} severity="error">
                            {formErrors.cellPhone}
                        </Alert>
                    ) : (
                        <p></p>
                    )}
                    <InputText
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email ? (
                        <Alert sx={{ width: 1, pt: 1 }} severity="error">
                            {formErrors.email}
                        </Alert>
                    ) : (
                        <p></p>
                    )}
                    <ButtonPrimary
                        label={'Editar'}
                        onClick={handleFormSubmit}
                    />
                </FormContainer>
            </div>
        </>
    )
}

export default EditUser
