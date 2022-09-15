import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, description) {
  return { name, description };
}

const rows=[
    createData("CI",  "3333333"),
    createData("Tipo de Sangre",  "ORH-"),
    createData("CI de discapacidad",  "33333333"),
    createData("Diagnóstico psicológico ",  "Este es un ejemplo de diagnostico"),
    createData("Diagnóstico nerológico",  "Este es un ejemplo de diagnostico"),
    createData("Diagnóstico especial",  "Este es un ejemplo de diagnostico"),
    createData("Problemas de salud",  "Problema 1, Problema 2"),
];

const useStyles = makeStyles({
  table: {
    width: '50%',
    height: 50,
    margin: "auto"
  }
 });

export default function DataHealth() {

  const classes = useStyles();
  const nameKid = "Pedro";
  return (
    <div style={{ width: '100%' }}>
    <h1> {nameKid}  -> Información de salud </h1>
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableBody >
          {rows.map((row) => (
            <TableRow 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" className={classes.table}>
                {row.name}
              </TableCell>
              <TableCell align="right" >{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

