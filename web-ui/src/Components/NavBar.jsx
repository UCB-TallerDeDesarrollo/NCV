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
        
       <Grid sx={{ placeItems: 'center', color:'#023859'}} container>
            
            <Grid item xs={1}>
              <Typography sx={{cursor:'pointer'}}>
                 <img
                    onClick={handleClickHome}
                    height="60"
                    width='150'
                    src={imgNiñosConValor}
                    alt="Niños con Valor"
                    className="logo-img-nvar"
                />
              </Typography>
            </Grid>
            
            <Grid item xs={4} />
            {accesPermiss=="ComplitAcces" &&
              <Grid  item xs={1}>
                  <Button sx={{marginLeft:35,width:150,textTransform:'none'}} color="inherit" onClick={handleClickViewUsers}>Lista de usuarios</Button>
              </Grid>
            }
            {((accesPermiss=="ComplitAcces") || (accesPermiss=="RestrinccionAcces")) &&
              <Grid  item xs={1}>
                  <Button  sx={{marginLeft:40,width:150,textTransform:'none'}} className='btn-files' color="inherit" onClick={handleClickFiles}>Files de los niños</Button>
              </Grid>
            }

            {accesPermiss=="ComplitAcces" &&
              <Grid  item xs={1}>
                  <Button sx={{marginLeft:45, width:150,textTransform:'none'}} className='btn-activosFijos' color="inherit" onClick={handleClickAssets}>Activos Fijos</Button>
              </Grid>
            }

            <Grid item xs={1}>
                <Button sx={{marginLeft:50,width:100,textTransform:'none'}} color="inherit" onClick={handleClickExit}>Salir</Button>
            </Grid>



        </Grid>
        
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
