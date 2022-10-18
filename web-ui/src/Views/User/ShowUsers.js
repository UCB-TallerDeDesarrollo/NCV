import React from 'react';

import Box from '@mui/material/Box';
import ListContainer from "../../Components/ListContainer";
import Navbar from '../../Components/NavBar';
import ButtonPrimary from '../../Components/MUI-Button';
import ListBasic from '../../Components/ListBasic';
import ErrorPage from '../../Components/ErrorPage';
import { useNavigate } from 'react-router-dom'; 

function ShowUser() {
    const navigate = useNavigate();
    const completeInfoUser = '/vista-usuarios';
    //const url = 'URL-TO-BACKEND-HERE';
    //const { apiData:users, error } = getFromApi(url);

    //Delete hardcoded users
    const users = [
        {
            id: 1,
            email: "jhonnywhere@gmail.com",
            firstName: "Jhon",
            lastName: "Wells",
            phoneNumber: 70188321,
        },
        {
            id: 2,
            email: "marioherewego@hotmail.com",
            firstName: "Mario",
            lastName: "Mario",
            phoneNumber: 72143516,
        },
        {
            id: 3,
            email: "jimmymcgill@gmail.com",
            firstName: "Jimmy",
            lastName: "McGill",
            phoneNumber: 642111234,
        },
        {
            id: 4,
            email: "rromas@gmail.com",
            firstName: "Rodrigo",
            lastName: "Romans",
            phoneNumber: 792991224,
        },
    ]

    const listElements = users.map((el)=>{
        return {
            id:el.id, 
            title:`${el.firstName} ${el.lastName}`, 
            description:`${el.email} - ${el.phoneNumber}`, 
            elementUrl:`${completeInfoUser}/${el.id}`,
        }
    })
    let usersComponents = <ListBasic items={listElements} withImage={false}/>
    let registerUser = "/registrarse-ncv"
    const listHeaderComponents = <ButtonPrimary label={"Registrar Usuario"} onClick={()=>navigate(registerUser)}/>
    return ( 
        <>
            <Navbar />
            <Box sx={{ display: 'flex', justifyContent: 'center' , marginTop:'15vh'}}>
                <ListContainer title="Lista de usuarios" header={listHeaderComponents}>
                    {usersComponents}
                </ListContainer>
            </Box>
        </>
    );
}

export default ShowUser;