import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import FormContainer from '../../../Components/FormContainer';
import InputText from '../../../Components/InputText';
import ButtonPrimary from '../../../Components/MUI-Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';


const kidFile = {
  firstName: '',
  lastName: '',
  ci: '',
  birthDate: '',
  programHouse:'',
  birthPlace: '',
  gender: ''
}

var listCheck = {
    checkFirstName: true,
    checkLastName: true,
    checkCI: true,
    checkBirthDate: true,
    checkProgramHouse: true,
    checkBirthPlace: true,
    checkGender: true
};

var listAlerts = {
    alertFirstName: "El Nombre no debe contener numeros ni debe contener simbolos.",
    alertLastName: "El Apellido no debe contener numeros ni debe contener simbolos.",
    alertCI: "El CI debe ser valido!",
    alertBirthDate: "La fecha de nacimiento debe ser una fecha valida!",
    alertProgramHouse: "La Casa debe ser valida!",
    alertBirthPlace: "El lugar de nacimiento debe ser un lugar valido!",
    alertGender: "Debe seleccionar un genero!"
};

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
    var url = "https://ncv-api.azurewebsites.net/api/kids"
    const navigate = useNavigate()
    const [data, setData] = useState(kidFile)
    const [open, setOpen] = useState(false)
    const [firstNameValidation, setFirstNameValidation] = useState(false)
    const [lastNameValidation, setLastNameValidation] = useState(false)
    const [birthDateValidation, setBirthDateValidation] = useState(false)

    
    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setData({
            ...data,
            [name]:value
        })

    }

    function resetChecks(){
        listCheck.checkBirthDate = true;
        listCheck.checkBirthPlace = true;
        listCheck.checkCI = true;
        listCheck.checkFirstName = true;
        listCheck.checkGender = true;
        listCheck.checkLastName = true;
        listCheck.checkProgramHouse = true;
    }

    function checkData(dataToCheck){
        var check = true;
        var checkNumbers = /[0-9]/;
        if(dataToCheck.firstName.match(checkNumbers) != null){
            listCheck.checkFirstName = false;
            check = false;
        }

        if(dataToCheck.lastName.match(checkNumbers) != null){
            listCheck.checkLastName = false;
            check = false;
        }

        let actualDate = new Date();
        //console.log(actualDate.setUTCDate(11));
        console.log(actualDate);
        console.log("Hoy: " + actualDate.getFullYear() +" "+ (actualDate.getMonth()+1) +" "+ actualDate.getDate() )
        var selectedYear = dataToCheck.birthDate[0] + dataToCheck.birthDate[1] + dataToCheck.birthDate[2] + dataToCheck.birthDate[3];
        var selectedMonth = dataToCheck.birthDate[5] + dataToCheck.birthDate[6];
        var selectedDay = dataToCheck.birthDate[8] + dataToCheck.birthDate[9];

        if( selectedYear > actualDate.getFullYear()) {
            console.log("Seleccion de año posterior.");
            listCheck.checkBirthDate = false;
            check = false;
        }else{
            if( selectedYear == actualDate.getFullYear() && selectedMonth > (actualDate.getMonth()+1)) {
                console.log("Seleccion de mes posterior.");
                console.log(selectedMonth);
                console.log(actualDate.getMonth());
                console.log(selectedMonth > actualDate.getMonth());
                listCheck.checkBirthDate = false;
                check = false;
            }else{
                if( selectedYear == actualDate.getFullYear() && selectedMonth == (actualDate.getMonth()+1) && selectedDay > actualDate.getDate()) {
                    console.log("Seleccion de dia posterior.");
                    listCheck.checkBirthDate = false;
                    check = false;
                }
            }
        }
        // console.log(actualYear + " " + hoy.getFullYear());
        // console.log(actualYear > hoy.getFullYear());
        // console.log(actualMonth + " " + hoy.getMonth());
        // console.log(actualMonth > hoy.getMonth());
        // console.log(actualDay + " " + hoy.getDate());
        // console.log(actualDay > hoy.getDate());
        return check;
    }

    function handleFormSubmit() {
        resetChecks();
        setFirstNameValidation(false);
        setLastNameValidation(false);
        setBirthDateValidation(false);
        if(checkData(data) > 0){
            console.log("Form buenardo");
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
        }else{
            console.log("Form terrible, oremos");
            console.log(listCheck);
            if(listCheck.checkFirstName == false) setFirstNameValidation(true);
            if(listCheck.checkLastName == false) setLastNameValidation(true);
            if(listCheck.checkBirthDate == false) setBirthDateValidation(true);
        }

        
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
                <Collapse in={firstNameValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertFirstName}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="lastName"
                    name="lastName"
                    label="Apellidos"
                    type="text"
                    value={data.lastName}
                    onChange={handleInputChange}
                />
                <Collapse in={lastNameValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertLastName}
                    </Alert>
                </Collapse>
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
                <Collapse in={birthDateValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertBirthDate}
                    </Alert>
                </Collapse>
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
