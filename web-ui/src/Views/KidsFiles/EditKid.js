import React from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import FormContainer from '../../Components/FormContainer';
import InputText from '../../Components/InputText';
import ButtonPrimary from '../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { width } from '@mui/system';
import Navbar from '../../Components/NavBar';

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { getOneKid } from './API/getAxios';
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
    const { kidId } = useParams()
    console.log("kidId: ",kidId)
    var urlKid = "https://ncv-api.herokuapp.com/api/kids/"+ kidId 
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

    
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Modificar datos del niño">
                <InputText
                    required
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={kid.firstName}
                    onChange={handleInputChange}
                />
                 <InputText
                    required
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
                    required
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={kid.birthDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="programHouse"
                    name="programHouse"
                    type="text"
                    value={kid.programHouse}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    value={kid.birthPlace}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    select
                    id="gender"
                    name="gender"
                    type="text"
                    value={kid.gender}
                    onChange={handleInputChange}
                >
                {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                </InputText>
            </FormContainer>
        </div></>
    );
}
export default EditKidFile;