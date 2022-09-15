import React, {useState,Component} from 'react'
import axios from 'axios'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { useParams } from 'react-router-dom';

export default  function ShowFixedAsset(){
  let fixedAssetId = useParams();
  console.log(fixedAssetId.id);
  const [fixedAsset, setFixedAsset] = useState({});
  axios.get(`https://ncv-api.herokuapp.com/api/fixedAssets/${fixedAssetId.id}`).then(res =>{
    if(res.status == 200){      
       setFixedAsset(res.data)
       console.log(fixedAsset)
    }
    });
  return(
    <div>
        <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
            ></IconButton>
            </Toolbar>
        </AppBar>
        <div>
        <ul>      
               <Card style={{ minHeight: '80vh' }}> <li>
                <CardHeader title= {fixedAsset.name} />
                <Box
                    component="img"
                    sx={{
                      height: 533,
                      width: 750,
                      maxHeight: { xs: 733, md: 567 },
                      maxWidth: { xs: 750, md: 750 },
                    }}
                    alt="Activo fijo."
                    src="https://comovertodogratis.com/wp-content/uploads/2021/05/1621943166_La-computadora-portatil-Teclast-F15-hoy-a-un-precio-increible-2048x1280.jpg"
                  />
                <CardContent>
                  DESCRIPCIÓN: {fixedAsset.description} <br></br>
                  FECHA DE ENTRADA: {fixedAsset.entryDate.split("T")[0]}<br></br>
                  PRECIO: {fixedAsset.price}<br></br>
                  CARACTERÍSTICAS: {fixedAsset.features}<br></br>
                  CANTIDAD: {fixedAsset.quantity}<br></br>
                </CardContent>
                </li></Card>       
        </ul>
      </div>
    </div>
  );
}
