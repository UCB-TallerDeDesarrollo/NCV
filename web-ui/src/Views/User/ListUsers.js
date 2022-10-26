import ErrorPage from '../../Components/ErrorPage'
import getFromApi from '../../Components/GetFromApi'

import Box from '@mui/material/Box';
import ListContainer from "../../Components/ListContainer";
import Navbar from '../../Components/NavBar';
import ButtonPrimary from '../../Components/MUI-Button';
import ListBasic from '../../Components/ListBasic';
import { useNavigate } from 'react-router-dom';

function ListUsers() {
    const url="https://ncv-api.herokuapp.com/api/auth";
    const { apiData:users, error } = getFromApi(url);
    const navigate = useNavigate();
    if(error){
        return ErrorPage(error)
    }
    if (!users) return null
    if (users.length>0){
        const listElements = users.map((el) => {
            return {
                //id:el.id, 
                title: `${el.firstName} ${el.lastName}`,
                description: `${el.email} - ${el.cellPhone} - ${el.nameRole}`,
                //elementUrl:`${completeInfoUser}/${el.id}`,
            };
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
}
export default ListUsers