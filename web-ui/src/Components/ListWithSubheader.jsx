import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function ListWithSubheader({itemsHeader, itemsSubheader, withImage=true}) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const handlePress = () => {
    setIsVisible(isThisVisible => !isThisVisible);
  };
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
      fontWeight: 'bold'
    }
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
      {itemsHeader.map((h,i)=>{
        return (<>
            <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={h.id} alignItems="flex-start" onClick={() => handlePress()}>
              <ListItemText primary={h.title} secondary={h.description} className="ListElement" sx={sxListItemText}/>
            </ListItemButton>
                {isVisible && itemsSubheader.map((s,i)=>{
                        if (h.id == s.categoryId) {
                            return (
                              <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', m:0, pl: 3, pr: 3}} key={s.id} alignItems="flex-start" onClick={()=>navigate(s.elementUrl)}>
                                <ListItemText primary={s.title} secondary={s.description} className="ListElement" sx={{'& .MuiListItemText-primary': {fontSize: 18, color: 'gray'}}}/>
                              </ListItemButton>
                            )
                        }
                })}
        </>)})}
    </List>
  )};