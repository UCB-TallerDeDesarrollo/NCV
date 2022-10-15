import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableBasic({columnHeaders=null, data=null, align="center"}) {
  let tableHead = null
  let tableBody = null
  if (data != null){
    tableBody = (<TableBody>
      {data.map((row, rowIdx) => {
        let rowKeys = Object.keys(row);
        return (<TableRow
          key={rowIdx}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        {
          rowKeys.map((rk,i)=>(<TableCell key={i} align={align}>{row[rk]}</TableCell>))
        }
        </TableRow>
      )}
      )}
    </TableBody>)
  }
  if (columnHeaders!=null){
    tableHead = (<TableHead>
      <TableRow>
        {
          columnHeaders.map((colHeader,k)=>{
            return (<TableCell sx={{backgroundColor:'#CEECF2',fontWeight: 'fontWeightBold' }} key={k} align={align}>{colHeader}</TableCell>)
          })
        }
      </TableRow>
    </TableHead>)
  }
  return (
    <TableContainer component={Paper} sx={{width:0.5}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {tableHead}
        {tableBody}
      </Table>
    </TableContainer>
  );
}
