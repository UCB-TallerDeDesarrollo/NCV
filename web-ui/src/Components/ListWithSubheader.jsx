import List from '@mui/material/List';
import ListElement from './ListElement'
import { ListSubheader } from '@mui/material';

export default function ListWithSubheader({itemsHeader, itemsSubheader, withImage=true}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
      {itemsHeader.map((h,i)=>{
        return (<>
            <ListElement sx={{ width: '10%'}} key={h.id ? h.id : i} id={h.id} title={h.title} description={h.description} elementUrl={h.elementUrl} imgSrc={h.imgSrc} withImage={withImage}/>
            <ListSubheader sx={{ typography: { fontSize: 20, },}}>
                {itemsSubheader.map((s,i)=>{
                        if (h.id == s.categoryId) {
                            return (
                                <ListElement sx={{ width: '10%'}} key={s.id ? s.id : i} id={s.id} title={s.title} description={s.description} elementUrl={s.elementUrl} imgSrc={s.imgSrc} withImage={withImage}/>
                            )
                        }
                })}
            </ListSubheader>
        </>)})}
    </List>
  )};