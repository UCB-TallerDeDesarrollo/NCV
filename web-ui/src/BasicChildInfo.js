import * as React from 'react';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicChildInfo(){
    var id='1';
    var firtName = 'Default Name';
    let [kid, setKid] = useState('');
    const LinkKids = 'https://ncv-api.herokuapp.com/api/kids/'+id;
    //const LinkKids = 'https://ucb-tde-ninos-con-valor-api.herokuapp.com/api/kids';

  useEffect(() => {
    fetch(LinkKids)
      .then(res => res.json())
      .then(
        (result) => {
          setKid(result);
        }
      )
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        alt="child picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {kid.firstName} {kid.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Ci: {kid.ci} <br />
            Fecha de Nacimiento: {kid.birthDate} <br />
            Casa: {kid.programHouse} <br />
            Lugar de Nacimiento: {kid.birthPlace} <br />
            Genero: {kid.gender} <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
