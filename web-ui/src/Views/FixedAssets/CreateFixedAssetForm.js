import React, { useState } from 'react'
import Axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorPage from '../../Components/ErrorPage'
import FormContainer from '../../Components/FormContainer'
import InputText from '../../Components/InputText'
import Navbar from '../../Components/NavBar'
import Box from '@mui/material/Box'
import ButtonPrimary from '../../Components/MUI-Button'

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
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        window.location.href = '/activos-fijos'
        setOpen(false)
    }
    function checkError(){
        if(error){
            return ErrorPage(error)
        }
    }
    function submit(e) {
        e.preventDefault()
        Axios.post(url, {
            Name: data.Name,
            Description: data.Description==''? null:data.Description, // string
            EntryDate: data.EntryDate==''? null:data.EntryDate, // dateTime
            Price: data.Price==''? null:data.Price, // decimal
            Features: data.Features==''? null:data.Features, // string
            Quantity: data.Quantity==''? null:data.Quantity // int
        }).then((res) => {
            if (res.status == 201) {
                setOpen(true)
            }            
        }).catch ((apiError) => {
            console.log(apiError)
            setError(apiError) 
            checkError()                    
        })
    }

    if(error){
        return ErrorPage(error)
    }
    return (
        <><Navbar /><Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
        </Box>
        <div style={{display:'flex', justifyContent:'center'}}>
            <FormContainer title="Crear activo fijo">
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Name"
                    value={data.Name}
                    label="Nombre"
                    type="text"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="Description"
                    value={data.Description}
                    label="Descripción"
                    type="text"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="EntryDate"
                    value={data.EntryDate}
                    label="Fecha de Entrada"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Price"
                    value={data.Price}
                    label="Precio"
                    type="number"
                />
                <InputText
                    onChange={(e) => handle(e)}
                    id="Features"
                    value={data.Features}
                    label="Características"
                    type="text"
                />
                <InputText
                    required
                    onChange={(e) => handle(e)}
                    id="Quantity"
                    value={data.Quantity}
                    label="Cantidad"
                    type="number"
                />
                <ButtonPrimary label={"Crear"} id="submit_button" onClick={submit}/>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Activo Fijo Creado
                    </Alert>
                </Snackbar>
            </FormContainer>
        </div>
        </>
    )
}

export default CreateFixedAssetForm
