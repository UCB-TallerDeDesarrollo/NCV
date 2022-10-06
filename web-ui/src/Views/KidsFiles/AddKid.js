import React,{useState} from 'react';
import Button from '@mui/material/Button';
import FormContainer from '../../Components/FormContainer';
import InputText from '../../Components/InputText';
import ButtonPrimary from '../../Components/MUI-Button';
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

function CreateFile() {
  var url = "https://ncv-api.herokuapp.com/api/kids"
  const [data, setData] = useState(kidFile)
  
  const handleInputChange = (e)=>{
      const {name, value}=e.target
      setData({
        ...data,
        [name]:value
      })

  }

  function handleFormSubmit(event){
    event.preventDefault()
    const requestOptions={
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch(url, requestOptions)
            .then((response) => response.json())
            .then((res) => console.log(res));
        alert("Formulario subido!");
  }
    return (
        <><Navbar /><div style={{display:'flex', justifyContent:'center', marginTop: '3em'}}>
            <FormContainer title="Registrar nuevo niño">
                <InputText
                    required
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    type="text"
                    value={data.firstName}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    type="text"
                    value={data.lastName}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="ci"
                    name="ci"
                    label="CI"
                    type="text"
                    value={data.ci}
                    onChange={handleInputChange}
                />
                <InputText
                    required
                    id="birthDate"
                    name="birthDate"
                    label="Fecha de Nacimiento"
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
                    id="gender"
                    name="gender"
                    label="Genero"
                    type="text"
                    value={data.gender}
                    onChange={handleInputChange}
                />
                <ButtonPrimary label={"Registrar"} onClick={handleFormSubmit}/>
            </FormContainer>
        </div></>
    );
}

export default CreateFile;
