import React from 'react'
import {Button, Drawer, IconButton, List } from '@mui/material'
import { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


const DrawerComp = () => {
    var accesPermiss = sessionStorage.getItem("Access")
    const [open, setOpen] = useState(false)

    function handleClickViewUsers(){
        if(accesPermiss== "CompleteAccess"){  
          window.location.href = "/vista-usuarios";
        }
      }
    
      function handleClickFiles(){
        if(accesPermiss=="CompleteAccess" || accesPermiss=="RestriccionAccess"){  
          window.location.href = "/ninos";
        }
      }
    
      function handleClickAssets(){
        if(accesPermiss=="CompleteAccess"){
          window.location.href = '/activos-fijos';
        }
      }
  
    
      function handleClickExit(){
        sessionStorage.setItem("jwt", "");
        sessionStorage.setItem('Role',"")
        sessionStorage.setItem('Access',null)
        window.location.href = "/";
      }
  return (
    <>
      <Drawer 
        PaperProps={{
          sx: {backgroundColor:'#5CD4E2' }
        }} 
        open={open} 
        onClose={()=>setOpen(false)} >

        <List sx={{color:'#023859'}}>
            {accesPermiss=="CompleteAccess" &&
                  <Button sx={{marginRight:4,marginLeft:4,textTransform:'none'}} color="inherit" onClick={handleClickViewUsers}>Usuarios</Button>
            }
            <br></br>
            {((accesPermiss=="CompleteAccess") || (accesPermiss=="RestriccionAccess")) &&
                  <Button  sx={{marginRight:4,marginLeft:4,textTransform:'none'}} className='btn-files' color="inherit" onClick={handleClickFiles}>Niños</Button>
            }
            <br></br>
            {accesPermiss=="CompleteAccess" &&
                  <Button sx={{marginRight:4,marginLeft:4,textTransform:'none'}} className='btn-activosFijos' color="inherit" onClick={handleClickAssets}>Activos Fijos</Button>
            }
            <br></br>

                <Button sx={{marginRight:4,marginLeft:4,textTransform:'none'}} color="inherit" onClick={handleClickExit}>Salir</Button>

          
        </List>
      </Drawer>
      <IconButton sx={{marginLeft: 'auto', color:'#023859'}} onClick= {()=>setOpen(!open)}>
          <MenuRoundedIcon/>
      </IconButton>
    </>
  )
}

export default DrawerComp