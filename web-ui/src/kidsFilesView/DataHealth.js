/*
import React from 'react';
import { useLocation } from "react-router-dom";

function DataHealth(idKid){
    const location = useLocation();
    console.log( " parameter inside dataHealth: " , idKid  )
    console.log("LOCATion: ", location )
    const data = location.state?.data;
    return(
        <div>
            <h1> Welcome in data health</h1>
            <h2> id is {data ? data.id: "que?"  } </h2>
        </div>
    )
}

export default DataHealth;
*/
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories) {
  return { name, calories };
}

const rows=[
    createData("CI",  "3333333"),
    createData( "Nombre",  "firstName"),
    createData("Apellido",  "lastName"),
    createData("Tipo de Sangre",  "bloodType"),
    createData("CI de discapacidad",  "cIDiscapacidad"),
    createData("Diagnóstico psicológico ",  "psychologicalDiagnosis"),
    createData("Diagnóstico nerológico",  "neurologicalDiagnosis"),
    createData("Diagnóstico especial",  "specialDiagnosis"),
    createData("Problemas de salud",  "healthProblems"),
];
const rows_2 = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function DataHealth() {
  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
