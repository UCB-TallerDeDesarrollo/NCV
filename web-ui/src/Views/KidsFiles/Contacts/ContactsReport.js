import { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import axios from "axios";
import TableBasic from '../../../Components/TableBasic';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonPrimary from '../../../Components/MUI-Button';

var accesPermiss = sessionStorage.getItem("Access")

const contactsForm = {
    name :'',
    relationship :'',
    contactNumber :'',
    address : ''
}

function AddRowContacts({setContacts}){
    const {kidId} = useParams()
    var url = "https://ncv-api.herokuapp.com/api/kids/" + kidId +"/contacts"

    const [contactsData, setcontactsData] = useState(contactsForm)
    const [open, setOpen] = useState(false)

    function handleFormSubmit() {
        console.log("Datos enviados: ", contactsData)
        axios.post(url, contactsData)
          .then(function (response) {
            if (response.status == 201){
                console.log("Datos de contacto agregados¡¡¡")
                axios.get(url)
                    .then((res) => {
                        setContacts(res.data)
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
          contactsData.name = ''
          contactsData.relationship = ''
          contactsData.contactNumber = ''
          contactsData.address = ''
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOpen(false)
        setcontactsData({
            ...contactsData,
            [name]: value
        })
    }

    return <div><TableContainer component={Paper}>
                <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
                    {accesPermiss=="CompleteAccess"&&
                        <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={0} align={'center'} sx={{width:0.285}} >
                                <input
                                    placeholder="nombre..."
                                    name="name"
                                    value={contactsData.name}
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={1} align={'center'}>
                                <input
                                    placeholder="parentesco..."
                                    name="relationship"
                                    value={contactsData.relationship }
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center'}}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="teléfono..."
                                    name="contactNumber"
                                    value={contactsData.contactNumber }
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center' }}
                                ></input>
                            </TableCell>
                            <TableCell key={2} align={'center'}>
                                <input
                                    placeholder="dirección..."
                                    name="address"
                                    value={contactsData.address  }
                                    type="text"
                                    onChange={handleInputChange}
                                    style={{ width:120, textAlign:'center' }}
                                ></input>
                            </TableCell>
                        </TableRow>
                    }
                </Table>
           </TableContainer>
           <Box sx={{pt: 3,display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                {accesPermiss=="CompleteAccess"&&
                    <ButtonPrimary key={2} label="Añadir datos" onClick={handleFormSubmit} />
                }
            </Box>
           </div>
}


function Contacts({contactsData,setContacts}){

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


    let contactsTitle = null;
    let columnNames = ["Nombre","Parentesco","Teléfono","Dirección"];
    let table = <>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center'}}>
                <AutoAwesomeIcon sx={{margin:2}}/>
                <Typography variant="body2" sx={{marginBottom:3}}>No existen registros de <b>contactos</b></Typography>
        </Box>
        <Box sx={{display:"flex", flexDirection:"row"}}>
            <TableBasic align='center' columnHeaders={columnNames} data={contactsData} sxTableContainer={{width:1}}></TableBasic>
        </Box>
    </>

    if (contactsData != null && contactsData.length > 0){
        table = (<>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <TableBasic align='center' columnHeaders={columnNames} data={contactsData} sxTableContainer={{width:1}} withDeleteIcon={"use here navigate"}></TableBasic>
            </Box>
        </>);
        contactsTitle = <Typography variant="h3" sx={{marginBottom:1.5}}>contactos</Typography>;
    }
    return (<Box sx={{ display: 'flex', flexDirection:'column' }}>
        <Box sx={{ display: 'flex', flexDirection:'row', alignItems:'center',  justifyContent:'space-between'}}>
            {contactsTitle}
        </Box>
        {table}
        <AddRowContacts setContacts={setContacts}/>
    </Box>);
}


export default Contacts;