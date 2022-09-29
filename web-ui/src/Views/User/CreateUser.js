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
    Button
, Autocomplete, Container } from '@mui/material'

import Axios from 'axios'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function CreateUser() {
    const url = 'https://ncv-api.herokuapp.com/api/auth'
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({
        FirstName: '',
        LastName: '',
        CellPhone: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    })
    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
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
        Axios.post(url, {
            FirstName: data.FirstName,
            LastName: data.LastName, // string
            CellPhone: data.CellPhone, // number
            Email: data.Email, // email
            Password: data.Password, // password
            ConfirmPassword: data.ConfirmPassword, // password
            Rol : data.Rol // string
        }).then((res) => {
            if (res.status == 201) {
                setOpen(true)
            }
            console.log(res.status)
        })
    }
    return (
        <Box
            sx={{
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
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity="success">
                            Usuario Creado
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateUser
