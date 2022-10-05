import React from 'react'
import { AppBar, Grid, Typography, Toolbar, Tabs , Link, Tab, Box, Button ,useTheme , useMediaQuery} from '@mui/material';
import imgNiñosConValor from '../Assets/img/logo-ncv2.png'
/* import NewUserForm from './NewUserForm'; */

var Rol = sessionStorage.getItem("Role")
function Navbar() {
  const theme = useTheme();
  
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  function handleClickFiles(){
    if(Rol=="Soporte" || Rol=="Admin"){  
      window.location.href = "/ninos";
    }
  }

  function handleClickAssets(){
    if(Rol=="Soporte" || Rol=="Admin"){
      window.location.href = '/activos-fijos';
    }
  }

  function handleClickHome(){
    window.location.href = "/inicio-ncv";
  }

  function handleClickSignIn(){
    
    if(Rol=="Soporte" || Rol=="Admin"){
      window.location.href = "/registrarse-ncv";
    }
  }

  function handleClickExit(){
    sessionStorage.setItem("jwt", "");
    sessionStorage.setItem('Role',"")
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
            
            <Grid xs={4} />
            <Grid  item xs={1}>
                <Button sx={{marginLeft:35,width:150,textTransform:'none'}} color="inherit" onClick={handleClickSignIn}>Registrar Usuario</Button>
            </Grid>
            
            <Grid  item xs={1}>
                <Button  sx={{marginLeft:40,width:150,textTransform:'none'}} className='btn-files' color="inherit" onClick={handleClickFiles}>Files de los niños</Button>
            </Grid>

            <Grid  item xs={1}>
                <Button sx={{marginLeft:45, width:150,textTransform:'none'}} className='btn-activosFijos' color="inherit" onClick={handleClickAssets}>Activos Fijos</Button>
            </Grid>


            <Grid item xs={1}>
                <Button sx={{marginLeft:50,width:100,textTransform:'none'}} color="inherit" onClick={handleClickExit}>Salir</Button>
            </Grid>



        </Grid>
        
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
