import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    <TableContainer component={Paper} sx={{borderRadius:2, boxShadow:0}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {tableHead}
        {tableBody}
      </Table>
    </TableContainer>
  );
}
