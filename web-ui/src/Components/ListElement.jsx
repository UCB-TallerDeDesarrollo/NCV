import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ListElement({id=0, title = "default title", description = "default description", imgSrc = "", elementUrl = "", withImage=true, withEditIcon=false, withDeleteIcon=false}){
  const navigate = useNavigate();
  
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
    }
  }
  
  let img = null;
  let deleteIcon = null
  let editIcon = null
  if (withImage)
    img = <ListItemAvatar> <Avatar alt="Remy Sharp" src={imgSrc}/> </ListItemAvatar>;
  if (withDeleteIcon){
    deleteIcon = 
    <IconButton aria-label="delete" size="small" className={"delete-assetState-button"}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  }
  if (withEditIcon){
    editIcon = 
    <IconButton aria-label="delete" size="small" className={"delete-assetState-button"} onClick={()=>alert("hola")}>
      <EditIcon fontSize="small" />
    </IconButton>
  }
  return <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={id} alignItems="flex-start" onClick={()=>navigate(elementUrl)}>
      {img}      
    <ListItemText primary={title} secondary={description} className="ListElement" sx={sxListItemText}/>
    {editIcon}
    {deleteIcon}
  </ListItemButton>;
}