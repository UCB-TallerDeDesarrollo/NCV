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

function TextCell({fieldName,value, editableAction , id=0}){
  if(editableAction != null){
    return (  <EditText sx={sxListItemText}
      name = {fieldName}
      onSave={(props)=>editableAction(props,id)}      
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


  var emptyHeader = null
  var insertDeleteIcon = (id) => {}

  if (deleteAction != null){
    emptyHeader = <TableCell sx={{backgroundColor:'#CEECF2',fontWeight: 'fontWeightBold' }} key="emptyHeader" align={align}></TableCell>
    insertDeleteIcon = (id) => { return ( <TableCell key="Deletebutton" align={align}> <ButtonPrimaryDeleteIcon onClick={()=>{deleteAction(id)}} sx={{marginLeft:1, alignSelf:'center'}} ></ButtonPrimaryDeleteIcon></TableCell> )}
  }

/*
  if( deleteAction == null){
    emptyHeader = null
  }else{
    emptyHeader = <TableCell sx={{backgroundColor:'#CEECF2',fontWeight: 'fontWeightBold' }} key="emptyHeader" align={align}></TableCell>
  }
*/
  if (data != null){
    tableBody = (<TableBody>
      {data.map((row, rowIdx) => {
        let rowKeys = Object.keys(row);
        rowKeys.shift(); // to delete the first elements: id , kidId
        rowKeys.shift();
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
                                  <TextCell fieldName={rk} value = {row[rk]} editableAction={editableAction} id={row.id}/>
                          </TableCell>)
            if (rk=='groupTitle')
              cell = (<TableCell key={i} align={align} sx={{fontWeight:'bold',paddingTop:3, fontSize:20, backgroundColor:'#f2f2f2'}}>{row[rk]}</TableCell>)
            return cell
          })
              
        }
        {insertDeleteIcon(row.id)}
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
