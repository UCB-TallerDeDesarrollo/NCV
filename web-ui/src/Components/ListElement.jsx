import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EditText} from 'react-edit-text';
import { ButtonPrimaryEditIcon, ButtonPrimaryDeleteIcon } from './MUI-Button';
import Box from '@mui/material/Box'
import 'react-edit-text/dist/index.css';

export default function ListElement({id=0, title = "default title", description = "default description", imgSrc = "", elementUrl = "", withImage=true, withEditIcon=false, editAction=null, editable=false, editActionOnSave=null, withDeleteIcon=false, deleteAction=null}){
  const navigate = useNavigate();
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
    }
  }  
  
  let img = null;
  let deleteIcon = null
  let editIcon = null
  let elementText = <ListItemText primary={title} secondary={description} className="ListElement" sx={sxListItemText}/>
  if (withImage)
    img = <ListItemAvatar> <Avatar alt="Remy Sharp" src={imgSrc}/> </ListItemAvatar>;
  if (withDeleteIcon){
    deleteIcon = 
    <ButtonPrimaryDeleteIcon id="delete_button" onClick={()=>{deleteAction(id)}} sx={{marginLeft:1, alignSelf:'center'}}/>
  }
  if (withEditIcon){
    editIcon = 
    <ButtonPrimaryEditIcon id="edit_button" onClick={()=>{editAction(id)}} sx={{marginLeft:1, alignSelf:'center'}}/>
  }
  if(editable){
    elementText =
    <EditText sx={sxListItemText}
      id={id.toString()}
      onSave={(props)=>editActionOnSave(props,id)}      
      defaultValue = {title} 
      editButtonProps={{ style: { marginLeft: '5px', width: 16 } }}      
    />
  }
  return <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={id} alignItems="flex-start" onClick={()=>navigate(elementUrl)}>
    {img}      
    {elementText}
    {editIcon}
    {deleteIcon}  
  </ListItemButton>;
}