// import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider, styled, responsiveFontSizes } from '@mui/material/styles'
  
let theme = createTheme({
typography: {
    fontFamily: `"DM Sans", sans-serif`,
    fontWeightRegular: 500,
    fontSize: 16,
    h1 : {
        fontFamily : `"Poppins", sans-serif`,
    },
    h2 : {
        fontFamily : `"DM Sans", sans-serif`,
        fontWeight : 600,
        fontSize : 35
    },
    h3 : {
        fontFamily : `"DM Sans", sans-serif`,
        fontWeight : 600,
        fontSize : 30,
    },
    h4 : {
        fontFamily : `"DM Sans", sans-serif`,
        fontWeight : 600,
        fontSize : 25
    },
    subtitle2 : {
        fontFamily : `"DM Sans", sans-serif`,
        fontWeight : 500,
        fontSize : 14,
        color : '#989a9f',
    }
},
});

theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ThemeProvider theme={theme}><App/></ThemeProvider>)
