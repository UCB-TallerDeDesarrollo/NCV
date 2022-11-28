import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ButtonPrimaryDeleteIcon} from './MUI-Button';
import { EditText} from 'react-edit-text';

const sxListItemText = {
  '& .MuiListItemText-primary': {
    fontSize: 10,
  }
}

function TextCell( { value, editableAction}){
  if(editableAction != null){
    return (  <EditText sx={sxListItemText}
      onSave={(props)=>editActionOnSave(props,id)}      
      defaultValue = {value} 
      editButtonProps={{ style: { marginLeft: '5px', width: 16 } }}      
    /> )
  }
  return value
}


export default function TableBasic({columnHeaders=null, data=null, align="center",sxTableContainer={}, deleteAction = null, editableAction=null}) {
  let tableHead = null
  let tableBody = null

  sxTableContainer.borderRadius = sxTableContainer.borderRadius ?? 2;
  sxTableContainer.boxShadow = sxTableContainer.boxShadow ?? 0;

  var insertDeleteIcon = null
  var emptyHeader = null
  if( deleteAction != null){
    insertDeleteIcon = <TableCell key="Deletebutton" align={align}>
                        <ButtonPrimaryDeleteIcon></ButtonPrimaryDeleteIcon>
                      </TableCell>
    emptyHeader = <TableCell sx={{backgroundColor:'#CEECF2',fontWeight: 'fontWeightBold' }} key="emptyHeader" align={align}></TableCell>
  }

  if (data != null){
    console.log("data: ",data)
    tableBody = (<TableBody>
      {data.map((row, rowIdx) => {
        let rowKeys = Object.keys(row);
        return (<TableRow
          key={rowIdx}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        {
          rowKeys.map((rk,i)=>{
            let backgroundColor = null
            if (rk.includes('empty'))
              backgroundColor = '#f2f2f2'
            let cell = (<TableCell key={i} align={align} sx={{backgroundColor:backgroundColor}}>
                                  <TextCell value = {row[rk]} editableAction={editableAction}/>
                          </TableCell>)
            if (rk=='groupTitle')
              cell = (<TableCell key={i} align={align} sx={{fontWeight:'bold',paddingTop:3, fontSize:20, backgroundColor:'#f2f2f2'}}>{row[rk]}</TableCell>)
            return cell
          })
              
        }
        {insertDeleteIcon}
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
        {emptyHeader}
      </TableRow>
    </TableHead>)
  }
  return (
    <TableContainer component={Paper} sx={sxTableContainer}>
      <Table sx={{ minWidth: 50 }} size="small" aria-label="a dense table">
        {tableHead}
        {tableBody}
      </Table>
    </TableContainer>
  );
}
