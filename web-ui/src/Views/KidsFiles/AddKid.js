import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import FormContainer from '../../Components/FormContainer';
import InputText from '../../Components/InputText';
import ButtonPrimary from '../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    
    const handleInputChange = (e)=>{
        const {name, value}=e.target
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
            console.log(error);
        });
    }

    return (
      <div style={{display:'flex', justifyContent:'center'}}>
            <FormContainer title="Registrar nuevo niño">
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
                    SelectProps={{
                        native: true,
                    }}
                    id="gender"
                    name="gender"
                    label="Genero"
                    type="text"
                    value={data.gender}
                    onChange={handleInputChange}
                >
                {genders.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
                </InputText>
                <ButtonPrimary label={"Registrar"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div>
    );
}

export default CreateFile;
