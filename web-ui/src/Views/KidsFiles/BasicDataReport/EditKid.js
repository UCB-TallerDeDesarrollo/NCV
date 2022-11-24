import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import FormContainer from '../../../Components/FormContainer';
import InputText from '../../../Components/InputText';
import ButtonPrimary, { ButtonSecondary } from '../../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';
import { Box } from '@mui/system';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

const genders = [
    {
      value: 'M',
      label: 'M',
    },
    {
      value: 'F',
      label: 'F',
    }
  ];

function EditKidFile() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlKid = "https://ncv-api.azurewebsites.net/api/kids/"+ kidId 
    const [kid, setKid] = useState([])
    const [open, setOpen] = useState(false)

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlKid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
    )}

    useEffect(() => {
        fetchBasicData()
    }, [])
    console.log("kid json: ",kid )

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setKid({
            ...kid,
            [name]:value
        })
    }

    function handleFormSubmit() {
        axios.put(urlKid, kid)
          .then(function (response) {
            if (response.status == 200){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Informacion Básica actualizada correctamente"}});
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
          });
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Informacion Básica sin modificaciones"}});
    }
    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar datos del niño">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        Todos los campos son requeridos
                    </Alert>
                </Collapse>
                <InputText
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={kid.firstName}
                    onChange={handleInputChange}
                />
                 <InputText
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={kid.lastName}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="ci"
                    name="ci"
                    type="text"
                    value={kid.ci}
                    onChange={handleInputChange}
                />
                <InputText
                    id="birthDate"
                    name="birthDate"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    value={kid.birthDate}
                    defaultValue={kid.birthDate}
                    onChange={handleInputChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <InputText
                    id="programHouse"
                    name="programHouse"
                    type="text"
                    value={kid.programHouse}
                    onChange={handleInputChange}
                />
                <InputText
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    value={kid.birthPlace}
                    onChange={handleInputChange}
                />
                <InputText
                    id="gender"
                    name="gender"
                    type="text"
                    value={kid.gender}
                    onChange={handleInputChange}
                >
                </InputText>
                <Box sx={{display: 'inline'}}>
                    <ButtonSecondary label="Cancelar" onClick={handleClose}></ButtonSecondary>
                    <ButtonPrimary label={"Guardar"} onClick={handleFormSubmit}></ButtonPrimary>
                </Box>
                
            </FormContainer>
        </div></>
    );
}
export default EditKidFile;
