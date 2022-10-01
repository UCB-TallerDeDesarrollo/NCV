import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ListElement({id=0, title = "default title", description = "default description", imgSrc = "", elementUrl = "", withImage=true}){
  const navigate = useNavigate();
  
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
    }
  }
  
  let img = null;
  if (withImage)
    img = <ListItemAvatar> <Avatar alt="Remy Sharp" src={imgSrc}/> </ListItemAvatar>;
  
  return <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={id} alignItems="flex-start" onClick={()=>navigate(elementUrl)}>
      {img}
    <ListItemText primary={title} secondary={description} className="ListElement" sx={sxListItemText}/>
  </ListItemButton>;
}