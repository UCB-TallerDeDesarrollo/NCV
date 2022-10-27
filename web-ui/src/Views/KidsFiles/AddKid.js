import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import FormContainer from '../../Components/FormContainer';
import InputText from '../../Components/InputText';
import ButtonPrimary from '../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/NavBar';


const kidFile = {
  firstName: '',
  lastName: '',
  ci: '',
  birthDate: '',
  programHouse:'',
  birthPlace: '',
  gender: ''
}

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

function CreateFile() {
    var url = "https://ncv-api.herokuapp.com/api/kids"
    const navigate = useNavigate()
    const [data, setData] = useState(kidFile)
    const [open, setOpen] = useState(false)
    
    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setData({
            ...data,
            [name]:value
        })

    }

    function handleFormSubmit() {
        axios.post(url, data)
        .then(function (response) {
            if (response.status == 201){
                navigate(`/ninos`,{state:{showAlert:true,alertMessage:"Archivo de niño creado exitosamente"}})
            }
        })
        .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                    setOpen(true)
            }
        });
    }

    //const todayDate = ()=>{
    //    let today = new Date().toISOString().split("T")[0];
    //    document.getElementsByName("birthDate")[0].setAttribute('max',today);
    //}

    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Registrar nuevo niño">
                <Collapse in={open} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        Todos los campos son requeridos
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="firstName"
                    name="firstName"
                    label="Nombres"
                    type="text"
                    value={data.firstName}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="lastName"
                    name="lastName"
                    label="Apellidos"
                    type="text"
                    value={data.lastName}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="ci"
                    name="ci"
                    label="Carnet de identidad (CI)"
                    type="text"
                    value={data.ci}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="birthDate"
                    name="birthDate"
                    label="Fecha de nacimiento"
                    type="date"
                    //max={todayDate}
                    value={data.birthDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="programHouse"
                    name="programHouse"
                    label="Casa"
                    type="text"
                    value={data.programHouse}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="birthPlace"
                    name="birthPlace"
                    label="Lugar de Nacimiento"
                    type="text"
                    value={data.birthPlace}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    select
                    id="gender"
                    name="gender"
                    label="Genero"
                    type="text"
                    value={data.gender}
                    onChange={handleInputChange}
                >
                {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </InputText>
                <ButtonPrimary label={"Registrar"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    );
}

export default CreateFile;
