import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import ButtonPrimary from '../../../Components/MUI-Button'
import InputText from '../../../Components/InputText'
import FormContainer from '../../../Components/FormContainer'
import axios from 'axios'
import Navbar from '../../../Components/NavBar';

const foundReport = {
    grade: '',
    school: '',
    rude: ''
}

function AddEducationReport() {
    const navigate = useNavigate();
    const {kidId} = useParams();
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/educationreports";

    const [formReport, setformReport] = useState(foundReport);
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
                navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Reporte de Educación creado"}});
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
            <FormContainer title="Reporte de Educación">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {'El campo de "Rude" es requerido'}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="Grade"
                    name="grade"
                    label="Grado Escolar"
                    type="text"
                    value={formReport.grade}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="School"
                    name="school"
                    label="Unidad Educativa"
                    type="text"
                    value={formReport.school}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="Rude"
                    name="rude"
                    label="Rude"
                    type="text"
                    value={formReport.rude}
                    onChange={handleInputChange}
                />
                
                <ButtonPrimary  label={"Crear reporte"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    )
}
export default AddEducationReport