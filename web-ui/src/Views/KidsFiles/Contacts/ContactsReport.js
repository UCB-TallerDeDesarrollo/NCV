import { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import axios from "axios";
import TableBasic from '../../../Components/TableBasic';
import Container from '../../../Components/Container';
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
import ButtonPrimary, { ButtonDanger, ButtonSecondary } from '../../../Components/MUI-Button';

var accesPermiss = sessionStorage.getItem("Access")

const biometricsForm = {
    name :'',
    relationship :'',
    contactNumber :'',
    address : ''
}

function AddRowContacts({setBiometrics}){
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/contacts"

    const [biometricsData, setbiometricsData] = useState(biometricsForm)
    const [open, setOpen] = useState(false)

    function handleFormSubmit() {
        console.log("Datos enviados: ", biometricsData)
        axios.post(url, biometricsData)
          .then(function (response) {
            if (response.status == 201){
                console.log("Datos de contacto agregados¡¡¡")
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
          biometricsData.name = ''
          biometricsData.relationship = ''
          biometricsData.contactNumber = ''
          biometricsData.address = ''
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setbiometricsData({
            ...biometricsData,
            [name]: value
        })
    }

    return <div><TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                    {accesPermiss=="ComplitAcces"&&
                        <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={0} align={'center'} sx={{width:0.285}} >
                                <input
                                    placeholder="nombre..."
                                    name="name"
                                    value={biometricsData.name}
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={1} align={'center'}>
                                <input
                                    placeholder="relación..."
                                    name="relationship "
                                    value={biometricsData.relationship }
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="contactNumber ..."
                                    name="contactNumber "
                                    value={biometricsData.contactNumber }
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:70, textAlign:'center' }}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="address  ..."
                                    name="address  "
                                    value={biometricsData.address  }
                                    type="text"
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

function Contacts({weightAndHeightData,setBiometrics}){
    const [filteredBiometrics, setFilteredBiometrics] = useState([]); 

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


    let weightAndHeightTitle = null;
    let columnNames = ["name ","relationship ","contactNumber ","address "];
    let table = <>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                <AutoAwesomeIcon sx={{margin:2}}/>
                <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>contactos</b></Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row"}}>
            <TableBasic align='center' columnHeaders={columnNames} data={weightAndHeightData} sxTableContainer={{width:1}}></TableBasic>
        </Box>
    </>
    // let table = <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
    //     <AutoAwesomeIcon sx={{margin:2}}/>
    //     <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>peso y talla</b></Typography>
    // </Box>;
    
    if (weightAndHeightData != null && weightAndHeightData.length > 0){
        table = (<>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic align='center' columnHeaders={columnNames} data={weightAndHeightData} sxTableContainer={{width:1}}></TableBasic>
            </Box>
        </>);
        weightAndHeightTitle = <Typography variant="h3" sx={{marginBottom:1.5}}>contactos</Typography>;
    }
    return (<Box sx={{ display: 'flex', flexDirection:'column' }}>
        <Box sx={{ display: 'flex', flexDirection:'row', alignItems:'center',  justifyContent:'space-between'}}>
            {weightAndHeightTitle}
        </Box>
        {table}
        <AddRowContacts setBiometrics={setBiometrics}/>
    </Box>);
}


export default Contacts;