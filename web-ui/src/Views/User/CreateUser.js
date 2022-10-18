import React, { useState } from 'react'
import {
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Select,
    MenuItem,
    Button,
    InputLabel,
    Autocomplete,
    Container
} from '@mui/material'

import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Navbar from '../../Components/NavBar'
import { margin } from '@mui/system'
import emailjs from 'emailjs-com'
import { createRoot } from 'react-dom/client'

function CreateUser() {
    const API = 'https://ncv-api.herokuapp.com/api/auth'
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [rol, setRol] = useState('')
    const [error, setError] = useState(null)
    const [data, setData] = useState({
        FirstName: '',
        LastName: '',
        CellPhone: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        rol: rol
    })
    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    function handleClick() {
        setOpen(true)
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    function submit(e) {
        e.preventDefault()
        Axios.post(`${API}/${rol}`, {
            FirstName: data.FirstName,
            LastName: data.LastName, // string
            CellPhone: data.CellPhone, // number
            Email: data.Email, // email
            Password: data.Password, // password
            ConfirmPassword: data.ConfirmPassword, // password
            Rol: data.Rol // string
        })
            .then((res) => {
                if (res.status == 200) {
                    setOpen(true)
                    alert('usuario creado')
                    navigate(`/inicio-ncv`)
                    sendEmail
                }
            })
            .catch(function (error) {
                alert(error)
            })
    }
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '5em' }}></div>
            <Box
                sx={{
                    marginTop: '10vh',
                    '& .MuiTextField-root': { m: 1, width: '45ch' }
                }}
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                        <Card sx={{ maxWidth: 450 }}>
                            <div>
                                <CardHeader
                                    style={{ textAlign: 'center' }}
                                    title="Crear Usuario"
                                />
                                <CardContent>
                                    <form onSubmit={(e) => submit(e)}>
                                        <TextField
                                            required
                                            onChange={(e) => handle(e)}
                                            id="FirstName"
                                            value={data.FirstName}
                                            placeholder="Nombre"
                                            type="text"
                                            variant="filled"
                                        />
                                        <br />
                                        <TextField
                                            onChange={(e) => handle(e)}
                                            id="LastName"
                                            value={data.LastName}
                                            placeholder="Apellido"
                                            type="text"
                                            variant="filled"
                                        />
                                        <br />
                                        <TextField
                                            required
                                            onChange={(e) => handle(e)}
                                            id="CellPhone"
                                            value={data.CellPhone}
                                            placeholder="Celular"
                                            type="number"
                                            variant="filled"
                                        />
                                        <br />
                                        <TextField
                                            required
                                            onChange={(e) => handle(e)}
                                            id="Email"
                                            value={data.Email}
                                            placeholder="Email"
                                            type="email"
                                            variant="filled"
                                        />
                                        <br />
                                        <TextField
                                            onChange={(e) => handle(e)}
                                            id="Password"
                                            value={data.Password}
                                            placeholder="Contraseña"
                                            type="password"
                                            variant="filled"
                                        />
                                        <br />
                                        <TextField
                                            required
                                            onChange={(e) => handle(e)}
                                            id="ConfirmPassword"
                                            value={data.ConfirmPassword}
                                            placeholder="Confirmar Contraseña"
                                            type="password"
                                            variant="filled"
                                        />
                                        <Autocomplete
                                            variant="filled"
                                            options={roles}
                                            inputValue={rol}
                                            onInputChange={(event, newRol) => {
                                                setRol(newRol)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Rol"
                                                    required
                                                />
                                            )}
                                        />
                                        <br />
                                        <CardActions
                                            style={{ justifyContent: 'center' }}
                                        >
                                            <Button variant="outlined">
                                                <Input
                                                    type="submit"
                                                    onClick={handleClick}
                                                    id={'submit_button'}
                                                >
                                                    Submit
                                                </Input>
                                            </Button>
                                        </CardActions>
                                    </form>
                                </CardContent>
                            </div>
                        </Card>
                        <Snackbar
                            autoHideDuration={6000}
                            onClose={handleClose}
                            setOpen={open}
                        >
                            {open ? (
                                <Alert onClose={handleClose} severity="success">
                                    Usuario Creado
                                </Alert>
                            ) : (
                                <Alert onClose={handleClose} severity="error">
                                    Error al registrar
                                </Alert>
                            )}
                        </Snackbar>
                    </Grid>
                </Grid>
            </Box>
            <div id="root"></div>
        </>
    )
}

const roles = [{ label: 'AuntUser' }, { label: 'AdminUser' }]

export default CreateUser

function sendEmail(e) {
    e.preventDefault()
    emailjs
        .sendForm(
            'service_fqnko4m',
            'template_1cszhti',
            e.target,
            'gP3o_iD52sF8GJvJH'
        )
        .then((res) => {
            alert('Se envio un correo de confirmacion.')
            console.log(res)
        })
}
