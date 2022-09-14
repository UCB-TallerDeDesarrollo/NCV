import React, {Component} from 'react'
import axios from 'axios'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export default class ShowFixedAssets extends Component{
  state ={
    assets: [],
  }
  async componentDidMount(){
    const res = await axios.get('https://ncv-api.herokuapp.com/api/fixedAssets');
    this.setState({ assets: res.data});
    // this.state.assets = res.data;
    //this.state.assets.map(asset => (console.log(asset.name)))
    //console.log(this.state.assets[0].id);
  }
  render(){
    return (
      <div>
        <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
            ></IconButton>
            </Toolbar>
        </AppBar>
        <div>
        <ul>
          
          {
            this.state.assets.map( asset => {
              return <Card> <li>
                <CardHeader title= {asset.name} />
                <CardContent>
                  {asset.description}
                </CardContent>
                 </li></Card>
            })
          } 
        </ul>
      </div>
      </div>
    )
  }
}