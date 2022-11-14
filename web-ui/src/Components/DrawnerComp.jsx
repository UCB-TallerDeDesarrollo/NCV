import React from 'react'
import {Button, Drawer, IconButton, List } from '@mui/material'
import { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


const DrawerComp = () => {
    var accesPermiss = sessionStorage.getItem("Access")
    const [open, setOpen] = useState(false)
    function handleClickUser(){
      console.log("Button clicked")
      window.location.href = "/user";
    }

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
    <>
      <Drawer 
        PaperProps={{
          sx: {backgroundColor:'#5CD4E2' }
        }} 
        open={open} 
        onClose={()=>setOpen(false)} >
        <List>
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

          
        </List>
      </Drawer>
      <IconButton sx={{marginLeft: 'auto', color: 'white'}} onClick= {()=>setOpen(!open)}>
          <MenuRoundedIcon/>
      </IconButton>
    </>
  )
}

export default DrawerComp