import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListElement from './ListElement'

export default function ListBasic({items,listUrl,withImage=true}) {
  return (
    <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
      {items.map((n,i)=>{
        return (<>
            <ListElement key={n.id ? n.id : i} id={n.id} title={n.title} description={n.description} resourceUrl={listUrl} withImage={withImage}/>
            <Divider/>
        </>)})}
    </List>
  )};