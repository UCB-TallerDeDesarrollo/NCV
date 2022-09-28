import ListItem from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ListElement({id, title = "default title", description = "default description", imgSrc = "", resourceUrl = "", withImage=true}){
    const navigate = useNavigate()
    let img = null;
    if (withImage)
      img = <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={imgSrc}/>
      </ListItemAvatar>;
    return <ListItemButton alignItems="flex-start" onClick={()=>navigate(`${resourceUrl}/${id}`)}>
    {img}
    <ListItemText primary={title} secondary={description} />
  </ListItemButton>;
}