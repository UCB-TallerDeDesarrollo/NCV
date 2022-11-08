import React from 'react'
import { AppBar, Grid, Typography, Toolbar, Tabs , Link, Tab, Box, Button ,useTheme , useMediaQuery} from '@mui/material';
import imgNiñosConValor from '../Assets/img/logo-ncv2.png'
/* import NewUserForm from './NewUserForm'; */

var accesPermiss = sessionStorage.getItem("Access")
function Navbar() {
  const theme = useTheme();
  
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  function handleClickViewUsers(){
    if(accesPermiss== "ComplitAcces"){  
      window.location.href = "/vista-usuarios";
    }
  }

  function handleClickFiles(){
    if(accesPermiss=="ComplitAcces" || accesPermiss=="RestrinccionAcces"){  
      window.location.href = "/ninos";
    }
  }

  function handleClickAssets(){
    if(accesPermiss=="ComplitAcces"){
      window.location.href = '/activos-fijos';
    }
  }

  function handleClickHome(){
    window.location.href = "/inicio-ncv";
  }

  function handleClickExit(){
    sessionStorage.setItem("jwt", "");
    sessionStorage.setItem('Role',"")
    sessionStorage.setItem('Access',null)
    window.location.href = "/";
  }
  
  return (
    <AppBar sx={{backgroundColor: '#5CD4E2'}}>
      <Toolbar>
        
            
            
              <Typography sx={{cursor:'pointer' , flexGrow: 1, display: { xs: 'none', sm: 'block' }}}>
                 <img
                    onClick={handleClickHome}
                    height="60"
                    width='150'
                    src={imgNiñosConValor}
                    alt="Niños con Valor"
                    className="logo-img-nvar"

                />
              </Typography>
            
            
       <Box sx={{color:'#023859', display: { xs: 'none', sm: 'block' }}} >
            
            {accesPermiss=="ComplitAcces" &&
                  <Button sx={{marginLeft:5,textTransform:'none'}} color="inherit" onClick={handleClickViewUsers}>Usuarios</Button>
            }

            {((accesPermiss=="ComplitAcces") || (accesPermiss=="RestrinccionAcces")) &&
                  <Button  sx={{marginLeft:5,textTransform:'none'}} className='btn-files' color="inherit" onClick={handleClickFiles}>Niños</Button>
            }

            {accesPermiss=="ComplitAcces" &&
                  <Button sx={{marginLeft:5,textTransform:'none'}} className='btn-activosFijos' color="inherit" onClick={handleClickAssets}>Activos Fijos</Button>
            }

                <Button sx={{marginLeft:5,textTransform:'none'}} color="inherit" onClick={handleClickExit}>Salir</Button>



        </Box>
        
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
