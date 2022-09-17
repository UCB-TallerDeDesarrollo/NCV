/* eslint-disable react/jsx-key */
import React, { Component } from 'react'
import axios from 'axios'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import positions from '@mui/system'

export default class ShowFixedAssets extends Component {
  state = {
    assets: []
  }

  async componentDidMount () {
    const res = await axios.get('https://ncv-api.herokuapp.com/api/fixedAssets')
    this.setState({ assets: res.data })
  }

  render () {
    return (
      <div>
        <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
            ></IconButton>
            </Toolbar>
        </AppBar>
        <div style={{ marginLeft: '7%' }}>
          <div>
            <h1>ACTIVOS FIJOS</h1>
          </div>
          {
          this.state.assets.map(asset => {
            return <Grid id="lista-activos-fijos" style={{ minHeight: '60vh' }}>
            <Card sx={{ p: 2, maxWidth: 1300 }} key={asset.id}>
              <Box sx={{ display: 'flex' }}>
              <CardHeader id="Name" title= {asset.name} />
              </Box>
              <Box sx={{ display: 'inline-block' }} >
                <CardMedia component="img"
                image="https://st.depositphotos.com/1005574/2080/v/450/depositphotos_20808761-stock-illustration-laptop.jpg"
                sx={{ width: 400 }}></CardMedia>
              </Box>
              <Box sx={{ display: 'inline-block', position: 'absolute', right: '30%' }}>
                <CardContent>
                  <h4>Descripción: {asset.description} </h4>
                  <h4>Fecha de entrada: {asset.entryDate} </h4>
                  <h4>Características: {asset.features} </h4>
                  <h4>Precio: {asset.price} </h4>
                  <h4>Cantidad: {asset.quantity}</h4>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          })
          }
      </div>
      </div>
    )
  }
}
