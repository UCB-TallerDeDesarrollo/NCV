import React, { useReducer } from 'react'
import { Typography, Card, CardContent, Grid, TextField, Select, MenuItem, Button } from '@material-ui/core'
import { Autocomplete, Container } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

function CreateUser () {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({
      ...state, ...newState
    }), {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      cpassword: ''
    }

  )

  const handleSubmit = evt => {
    evt.preventDefault()

    const data = { formInput }

    fetch('https://ucb-tde-ninos-con-valor-api.herokuapp.com/api/kids', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
  }

  const handleInput = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
  }

  return (
    <div className="App">
      <Typography gutterBotton variant= "h3" align="center">
        Create User
      </Typography>
      <Card style={{ maxWidth: 450, margin: '0 auto', padding: '20px 5px' }}>

        <CardContent>
          <Typography variant= "h5">
            Create an user account
          </Typography>

          <form onSubmit= {handleSubmit}>
            <Grid container spacing={1}>

              <Grid xs={12} sm={6} item>
                <TextField name='name' onChange={handleInput} label="First Name" placeholder="Enter first name" variant="outlined" fullWidth required />
              </Grid>

              <Grid xs={12} sm={6} item>
              <TextField name='lastname' onChange={handleInput} label="Last Name" placeholder="Enter last name" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
              <TextField name='phone' onChange={handleInput} type="number" label="Phone" placeholder="Enter phone number" variant="outlined" fullWidth required />
              </Grid>

              <Grid xs={12} item>
              <TextField id="select" label="UserRol" value="Administrativo" fullWidth select>
                  <MenuItem value="Tia">  Tia </MenuItem>
                  <MenuItem value="Administrativo"> Administrativo  </MenuItem>
              </TextField>
              </Grid>

              <Grid xs={12} item>
              <TextField name='email' onChange={handleInput} type="email" label="Email" placeholder="Enter email" variant="outlined" fullWidth required />
              </Grid>
              <Grid xs={12} item>
              <TextField name='password' onChange={handleInput} type="password" label="Password" placeholder="Enter Password" variant="outlined" fullWidth required />
              </Grid>

              <Grid xs={12} item>
              <TextField name='cpassword' onChange={handleInput} type="password" label="Confirm Password" placeholder="Enter Password" variant="outlined" fullWidth required />
              </Grid>

              <Grid xs={12} item>
              <Button type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
              </Grid>

              <Grid xs={12} item>
              <Button type="submit" variant='contained' color="secondary" fullWidth >Cancel</Button>
              </Grid>
            </Grid>
          </form >

        </CardContent>

      </Card>
    </div>
  )
}

export default CreateUser
