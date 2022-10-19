import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Components/NavBar'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Collapse from '@mui/material/Collapse'
import MenuItem from '@mui/material/MenuItem';
import ButtonPrimary from '../../Components/MUI-Button';
import Alert from '@mui/material/Alert';

const user = {
    firstName: '',
    lastName: '',
    cellPhone: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: ''
}
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

function CreateUser() {
    var url = 'https://ncv-api.herokuapp.com/api/auth'
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(user)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setData({
            ...data,
            [name]: value
        })
    }

    function handleFormSubmit() {
        axios
            .post(`${url}/${data.rol}`, data)
            .then(function (response) {
                if (response.status == 200) {
                    navigate(`/inicio-ncv`,{state:{showAlert:true,alertMessage:"Usuario creado exitosamente"}})
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
                <FormContainer title="Registrar nuevo usuario">
                    <Collapse in={open} sx={{ width: 1, pt: 2 }}>
                        <Alert severity="error">
                            Todos los campos son requeridos
                        </Alert>
                    </Collapse>

                    <InputText
                        required
                        id="firstName"
                        name="firstName"
                        label="Nombre"
                        type="text"
                        value={data.firstName}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="lastName"
                        name="lastName"
                        label="Apellido"
                        type="text"
                        value={data.lastName}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="cellPhone"
                        name="cellPhone"
                        label="Celular"
                        type="number"
                        value={data.cellPhone}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="email"
                        name="email"
                        label="Correo electronico"
                        type="email"
                        value={data.email}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={data.password}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type="password"
                        value={data.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <InputText
                        required
                        select
                        id="rol"
                        name="rol"
                        label="Rol"
                        type="text"
                        value={data.rol}
                        onChange={handleInputChange}
                    >
                        {roles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </InputText>
                    <ButtonPrimary
                        label={'Registrar'}
                        onClick={handleFormSubmit}
                    />
                </FormContainer>
            </div>
        </>
    );
}

export default CreateUser
