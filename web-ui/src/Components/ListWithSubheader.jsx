import List from '@mui/material/List';
import ListElement from './ListElement'
import { ListSubheader } from '@mui/material';

export default function ListWithSubheader({itemsHeader, itemsSubheader, withImage=true}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', alignItems :"flex-start" }}>
      {itemsHeader.map((n,i)=>{
        return (<>
            <ListElement sx={{ width: '10%'}} key={n.id ? n.id : i} id={n.id} title={n.title} description={n.description} elementUrl={n.elementUrl} imgSrc={n.imgSrc} withImage={withImage}/>

        </>)})}
    </List>
  )};