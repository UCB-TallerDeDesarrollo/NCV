import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function DropdownList({itemsHeader, itemsSubheader, isOpened = false}) {
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();
  const didChange = useRef(false);
  const sxListItemText = {
    '& .MuiListItemText-primary': {
      fontSize: 18,
      fontWeight: 'bold'
    }
  }

  /*var asd = [];

  itemsHeader.map((el)=>{
    const keyValue = el.title
    asd.push({
      keyValue: true
    })
  })
  console.log(...asd)*/

  const visibleItems = {
    'Herramientas': true, 
    'Muebles y Enseres': true, 
    'Maquinaria y Equipos': true, 
    'Vehículos': true, 
    'Equipos de Computación': true,}

  function returnArrow(opened){
    if(!opened) return <ArrowDropDownIcon />
    return <ArrowDropUpIcon />
  }

  if(isOpened != didChange.current){
    setIsVisible({...visibleItems})
    didChange.current = isOpened
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
      {itemsHeader.map((h,i)=>{
        return (<>
            <ListItemButton sx={{borderTop: 1, borderColor:'#CDCDCD', margin:0}} key={h.id} alignItems="flex-start"
              onClick={() => setIsVisible({
                ...isVisible,
                [h.title]: !isVisible?.[h.title],
              })}
            >
            <ListItemText primary={h.title} secondary={h.description} className="ListElement" sx={sxListItemText}/>
            {!isVisible?.[h.title] ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
            </ListItemButton>
                {!isVisible?.[h.title] ? null : itemsSubheader.map((s,i)=>{
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