/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Collapse from '@mui/material/Collapse'
import MenuItem from '@mui/material/MenuItem'
import ButtonPrimary from '../../Components/MUI-Button'
import Alert from '@mui/material/Alert'

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
    const userId = '4cf62dc7-5e67-46fa-a227-f8dae70cba5a'
    var url = 'https://ncv-api.herokuapp.com/api/auth/' + userId
    const [user, setUser] = useState([])
    const [open, setOpen] = useState(false)

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
    }, [])
    console.log('user json: ', user)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleFormSubmit() {
        axios
            .put(url, user)
            .then(function (response) {
                if (response.status == 200) {
                    navigate(`/vista-usuarios/${userId}`, {
                        state: {
                            showAlert: true,
                            alertMessage: 'Usuario editado correctamente'
                        }
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status == 400) setOpen(true)
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
                    <InputText
                        required
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={user.lastName}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="cellPhone"
                        name="cellPhone"
                        type="number"
                        value={user.cellPhone}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
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
