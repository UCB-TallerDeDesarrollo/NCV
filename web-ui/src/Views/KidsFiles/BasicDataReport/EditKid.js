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
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import GetFromApi from '../../../Components/GetFromApi'

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

    if(dataToCheck.ci==''){
        listCheck.checkCI=false;
        check=false;
    }

    let actualDate = new Date();
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
    return check;
}

function EditKidFile() {
    const navigate = useNavigate();
    const {kidId} = useParams()
    var urlKid = process.env.REACT_APP_BACKEND_URL + "/api/kids/"+ kidId
    const [kid, setKid] = useState(kidFile)
    const [open, setOpen] = useState(false)
    const [firstNameValidation, setFirstNameValidation] = useState(false)
    const [lastNameValidation, setLastNameValidation] = useState(false)
    const [birthDateValidation, setBirthDateValidation] = useState(false)
    const [ciValidation, setCiValidation] = useState(false)
    const [programHouses, setProgramHouses] = useState([])
    const [listProgramHouses, setListProgramHouses] = useState([])

    var urlProgramHouses = process.env.REACT_APP_BACKEND_URL + '/api/programHouses'

    const fetchProgramHouses = () => {
        var responseProgramHouses = axios(urlProgramHouses);
        axios.all([responseProgramHouses]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setProgramHouses(dataBK)
            })
    )}

    const fetchBasicData = () => {
        var responseBasicKid = axios(urlKid);
        axios.all([responseBasicKid]).then(
            axios.spread((...allData) => {
                var dataBK = allData[0].data
                setKid(dataBK)
            })
        )
    }

    useEffect(() => {
        fetchBasicData();
        fetchProgramHouses();
    }, [])

    useEffect(() => {
        var l = [];
        programHouses.forEach(element=>{
            console.log(element);
            l.push({value: element.name, label: element.acronym})
        });
        setListProgramHouses(l);
    }, [programHouses]);

    console.log("kid json: ",kid )
    
    
    console.log('program houses: ',listProgramHouses);

    const handleInputChange = (e)=>{
        const {name, value}=e.target
        setOpen(false)
        setKid({
            ...kid,
            [name]:value
        })
    }

    function handleFormSubmit() {
        resetChecks();
        setFirstNameValidation(false);
        setLastNameValidation(false);
        setBirthDateValidation(false);
        setCiValidation(false);
        // programHousesList.forEach(element => {
        //     if (kid.programHouse == element.acronym){
        //         kid.programHouse = element.value;
        //     }
        // });
        if(checkData(kid) > 0){
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
        }else{
            console.log("Form terrible, oremos");
            console.log(listCheck);
            if(listCheck.checkFirstName == false) setFirstNameValidation(true);
            if(listCheck.checkLastName == false) setLastNameValidation(true);
            if(listCheck.checkBirthDate == false) setBirthDateValidation(true);
            if(listCheck.checkCI == false) setCiValidation(true);
        }
    }
    function handleClose() {
        navigate(`/ninos/${kidId}`,{state:{showAlert:true,alertMessage:"Informacion Básica sin modificaciones"}});
    }

    // to fix format date to show in edit report
    console.log("fecha: ",kid.birthDate)
    if(kid.birthDate ){
        kid.birthDate = kid.birthDate.split("T")[0]
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
                    required
                    id="firstName"
                    name="firstName"
                    label="Nombres"
                    type="text"
                    value={kid.firstName}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    type="text"
                    label="Apellidos"
                    value={kid.lastName}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    type="text"
                    label="Carnet de identidad (CI)"
                    value={kid.ci}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Collapse in={ciValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertCI}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    id="birthDate"
                    name="birthDate"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    label="Fecha de nacimiento"
                    value={kid.birthDate}
                    defaultValue={kid.birthDate}
                    onChange={handleInputChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Collapse in={birthDateValidation} sx={{width:1, pt:2}}>
                    <Alert severity="error">
                        {listAlerts.alertBirthDate}
                    </Alert>
                </Collapse>
                <InputText
                    required
                    select
                    id="programHouse"
                    name="programHouse"
                    label="Casa"
                    type="text"
                    value={kid.programHouse}
                    onChange={handleInputChange}
                >
                {listProgramHouses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                ))}
                </InputText>
                <InputText
                    required
                    id="birthPlace"
                    name="birthPlace"
                    type="text"
                    label="Lugar de Nacimiento"
                    value={kid.birthPlace}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <InputText
                    required
                    select
                    id="gender"
                    name="gender"
                    type="text"
                    label="Genero"
                    value={kid.gender}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                ))}
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
