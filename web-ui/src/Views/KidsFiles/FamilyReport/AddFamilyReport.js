import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../../../Components/MUI-Button'
import InputText from '../../../Components/InputText'
import FormContainer from '../../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../../Components/NavBar';
import MenuItem from '@mui/material/MenuItem';

const familyReport = {
    siblingsInFoundation: null,
    siblingsOutside: null,
}

const booleansAnwers = [
    {
      value: true,
      label: 'SI',
    },
    {
      value: false,
      label: 'NO',
    }
  ];

function AddFamilyReport() {
    var familyReport_hasExtendedFamily;
    var familyReport_hasOriginFamily;

    const navigate = useNavigate();
    const {kidId} = useParams();
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/familyreports";

    const [formReport, setformReport] = useState(familyReport);
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setformReport({
            ...formReport,
            [name]: value
        })
    }
    
    function handleFormSubmit() {
        axios.post(url, formReport)
          .then(function (response) {
            if (response.status == 201){
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Familia creado"}});
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
          });
    }

    return (
        <><Navbar /><div style={{marginTop: '3em', display:'flex', justifyContent:'center'}}>
            <FormContainer title="Reporte de Familia">
                <InputText
                    id="siblingsInFoundation"
                    name="siblingsInFoundation"
                    label="Nro de Hermanos en el Centro"
                    type="number"
                    value={formReport.siblingsInFoundation}
                    onChange={handleInputChange}
                />
                <InputText
                    id="siblingsOutside"
                    name="siblingsOutside"
                    label="Nro de Hermanos externos"
                    type="number"
                    value={formReport.siblingsOutside}
                    onChange={handleInputChange}
                />
                <InputText
                    select
                    id="hasExtendedFamily"
                    name="hasExtendedFamily"
                    label="¿Tiene familia extendida?"
                    value={familyReport_hasExtendedFamily}
                    onChange={handleInputChange}
                >
                {booleansAnwers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <InputText
                    select
                    id="hasOriginFamily"
                    name="hasOriginFamily"
                    label="¿Tiene familia de origen?"
                    value={familyReport_hasOriginFamily}
                    onChange={handleInputChange}
                >
                {booleansAnwers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <ButtonPrimary  label={"Crear reporte"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    )
}
export default AddFamilyReport
