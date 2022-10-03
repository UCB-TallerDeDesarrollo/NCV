import React, { useState } from 'react'
import Axios from 'axios'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Input from '@mui/material/Input'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorPage from '../../Components/ErrorPage'

function CreateFixedAssetForm(props) {
    const url = 'https://ncv-api.herokuapp.com/api/fixedAssets'
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        Name: '', // string
        Description: '', // string
        EntryDate: '', // dateTime
        Price: '', // decimal
        Features: '', // string
        Quantity: '' // int
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
            Name: data.Name,
            Description: data.Description, // string
            EntryDate: data.EntryDate, // dateTime
            Price: data.Price, // decimal
            Features: data.Features, // string
            Quantity: data.Quantity // int
        }).then((res) => {
            if (res.status == 201) {
                setOpen(true)
            }
            console.log(res.status)
        }).catch ((apiError) => {
            setError(apiError);
        })
    }

    if(error){
        return ErrorPage(error)
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
                                title="Create Fixed Asset"
                            />
                            <CardContent>
                                <form onSubmit={(e) => submit(e)}>
                                    <TextField
                                        required
                                        onChange={(e) => handle(e)}
                                        id="Name"
                                        value={data.Name}
                                        placeholder="Nombre"
                                        type="text"
                                        variant="filled"
                                    />
                                    <br />
                                    <TextField
                                        onChange={(e) => handle(e)}
                                        id="Description"
                                        value={data.Description}
                                        placeholder="Descripción"
                                        type="text"
                                        variant="filled"
                                    />
                                    <br />
                                    <TextField
                                        required
                                        onChange={(e) => handle(e)}
                                        id="EntryDate"
                                        value={data.EntryDate}
                                        placeholder="Fecha de Entrada"
                                        type="date"
                                        variant="filled"
                                    />
                                    <br />
                                    <TextField
                                        required
                                        onChange={(e) => handle(e)}
                                        id="Price"
                                        value={data.Price}
                                        placeholder="Precio"
                                        type="number"
                                        variant="filled"
                                    />
                                    <br />
                                    <TextField
                                        onChange={(e) => handle(e)}
                                        id="Features"
                                        value={data.Features}
                                        placeholder="Características"
                                        type="text"
                                        variant="filled"
                                    />
                                    <br />
                                    <TextField
                                        required
                                        onChange={(e) => handle(e)}
                                        id="Quantity"
                                        value={data.Quantity}
                                        placeholder="Cantidad"
                                        type="number"
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
                            Activo Fijo Creado
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateFixedAssetForm
