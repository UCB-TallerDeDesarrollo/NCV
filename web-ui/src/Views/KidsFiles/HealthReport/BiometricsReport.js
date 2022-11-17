import { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import axios from "axios";
import TableBasic from '../../../Components/TableBasic';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonPrimary from '../../../Components/MUI-Button';

var accesPermiss = sessionStorage.getItem("Access")

function formatDate(jsonDateStr){
    const options = { month: 'short', day: 'numeric'};
    var date  = new Date(jsonDateStr);
    return date.toLocaleDateString(undefined,options);
}

function formatDecimals(num){
    return num.toFixed(2);
}

const biometricsForm = {
    registerDate: "2018-07-22",
    weight: '',
    height: ''
}

function AddRowWeightAndHeight({setBiometrics}){
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/biometrics"

    const [biometricsData, setbiometricsData] = useState(biometricsForm)
    const [open, setOpen] = useState(false)

    let actualDate = new Date()
    let diffWithUTCTime = actualDate.getTimezoneOffset();
    actualDate.setMinutes(actualDate.getMinutes()-diffWithUTCTime);
    biometricsForm.registerDate = actualDate.toJSON().split("T")[0]

    function handleFormSubmit() {
        //console.log("Datos enviados: ", biometricsData)
        axios.post(url, biometricsData)
          .then(function (response) {
            if (response.status == 201){
                axios.get(url)
                    .then((res) => {
                        setBiometrics(res.data)
                    })
                    .catch((e)=>{
                    })
            }
          })
          .catch(function (error) {
            if (error.response){
                if (error.response.status == 400 )
                // Esto que hace ??
                    setOpen(true)
            }
          });
          biometricsData.height = ''
          biometricsData.weight = ''
          biometricsData.registerDate = actualDate.toJSON().split("T")[0]
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setbiometricsData({
            ...biometricsData,
            [name]: value
        })
    }
    // {formatDate(actualDate)}
    return <div><TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                    {accesPermiss=="ComplitAcces"&&
                        <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={0} align={'center'} sx={{width:0.285}} >
                                <input
                                    placeholder="fecha..."
                                    name="registerDate"
                                    type="date"
                                    value={biometricsData.registerDate}
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={1} align={'center'}>
                                <input
                                    placeholder="peso..."
                                    name="weight"
                                    value={biometricsData.weight}
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="talla..."
                                    name="height"
                                    value={biometricsData.height}
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center' }}
                                ></input>
                            </TableCell>
                        </TableRow>
                    }
                </Table>
           </TableContainer>
           <Box sx={{pt: 3,display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                {accesPermiss=="ComplitAcces"&&
                    <ButtonPrimary key={2} label="Añadir datos" onClick={handleFormSubmit} />
                }
            </Box>
           </div>
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function WeightAndHeight({weightAndHeightData,setBiometrics}){
    const [filteredBiometrics, setFilteredBiometrics] = useState([]);
    const [yearsSelected, setYearsSelected] = useState([]);

    let availableYears = new Set([]);
    weightAndHeightData.slice().forEach((b)=>{
        availableYears.add(new Date(b["registerDate"]).getFullYear());
    })
    availableYears = Array.from(availableYears);
    let maxYear = getMaxOfArray(availableYears);
    useEffect(()=>{
        setYearsSelected([maxYear.toString()]);
    },[]);
    
    useEffect(()=>{
        let fb = []
        let yearGroupIdx = 0;
        let yearGroup = availableYears[yearGroupIdx]
        fb.push({'groupTitle':yearGroup,'empty1':'','empty2':''})
        weightAndHeightData.slice().forEach((b)=>{
            if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                fb.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                yearGroupIdx+=1;
                yearGroup = availableYears[yearGroupIdx]
            }
            fb.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
        })
        setFilteredBiometrics(fb);
    },[weightAndHeightData]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
   
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setYearsSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    useEffect(()=>{
        let fb = []
        let finalFilteredBiometrics = []
        if (yearsSelected.length > 0){
            fb = weightAndHeightData.filter((b)=>{
                var ans = false;
                let biometricYear = (new Date(b["registerDate"]).getFullYear())
                yearsSelected.forEach((y)=>{
                    ans = ans || y == biometricYear;
                })
                return  ans;
            })
            let yearGroup = fb.length > 0 ? (new Date(fb[0]["registerDate"]).getFullYear()) : undefined
            finalFilteredBiometrics.push({'groupTitle':yearGroup, 'empty1':'','empty2':''})
            fb.forEach((b)=>{
                if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                    finalFilteredBiometrics.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                    yearGroup = (new Date(b["registerDate"]).getFullYear())
                }
                finalFilteredBiometrics.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
            })
            setFilteredBiometrics(finalFilteredBiometrics)
        }
        else{
            //DUPLICATED CODE: TECH DEBT
            let yearGroupIdx = 0;
            let yearGroup = availableYears[yearGroupIdx]
            fb.push({'groupTitle':yearGroup,'empty1':'','empty2':''})
            weightAndHeightData.slice().forEach((b)=>{
                if(yearGroup != (new Date(b["registerDate"]).getFullYear())){
                    fb.push({'groupTitle':(new Date(b["registerDate"]).getFullYear()), 'empty1':'','empty2':''})
                    yearGroupIdx+=1;
                    yearGroup = availableYears[yearGroupIdx]
                }
                fb.push({"registerDate":formatDate(b["registerDate"]), "weight":formatDecimals(b["weight"]), "height":formatDecimals(b["height"])});
            })
            setFilteredBiometrics(fb);
            //END OF DUPLICATED CODE
        }
    },[yearsSelected]);

    let yearComboBox = null;
    let weightAndHeightTitle = null;
    let columnNames = ["Fecha","Peso (Kg)","Talla (cm)"];
    let table = <>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                <AutoAwesomeIcon sx={{margin:2}}/>
                <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>peso y talla</b></Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row"}}>
            <TableBasic align='center' columnHeaders={columnNames} data={filteredBiometrics} sxTableContainer={{width:1}}></TableBasic>
        </Box>
    </>
    // let table = <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
    //     <AutoAwesomeIcon sx={{margin:2}}/>
    //     <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>peso y talla</b></Typography>
    // </Box>;
    
    if (weightAndHeightData != null && weightAndHeightData.length > 0){
        table = (<>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic align='center' columnHeaders={columnNames} data={filteredBiometrics} sxTableContainer={{width:1}}></TableBasic>
            </Box>
        </>);
        yearComboBox = (<FormControl sx={{ m: 1, minWidth: 100, justifySelf:'right', alignSelf:'end'}}>
            <InputLabel id="demo-multiple-checkbox-label">Año</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={yearsSelected}
                onChange={handleChange}
                input={<OutlinedInput label="Año" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
            {availableYears.map((year) => {
                console.log(maxYear);
                console.log(year);
                let checked = year == maxYear || yearsSelected.indexOf(year) > -1;
                return (<MenuItem key={year} value={year}>
                <Checkbox checked={checked}/>
                <ListItemText primary={year} />
                </MenuItem>
            )})}
            </Select>
        </FormControl>);
        weightAndHeightTitle = <Typography variant="h3" sx={{marginBottom:1.5}}>Peso y talla</Typography>;
    }
    return (<Box sx={{ display: 'flex', flexDirection:'column' }}>
        <Box sx={{ display: 'flex', flexDirection:'row', alignItems:'center',  justifyContent:'space-between'}}>
            {weightAndHeightTitle}
            {yearComboBox}
        </Box>
        {table}
        <AddRowWeightAndHeight setBiometrics={setBiometrics}/>
    </Box>);
}


export default WeightAndHeight;