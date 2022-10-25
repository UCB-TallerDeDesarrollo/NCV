import { Typography } from '@mui/material';
import Container from './Container';

export default function ListContainer({children,title=null,header=null}) {
  return (
        <Container>
          <div style={{ marginBottom: 10,display:'flex', alignItems:'center', flexDirection:'row', width:'100%',justifyContent:'space-between' }}>
              <Typography variant='h3' sx={{margin:0,padding:0}}>{title}</Typography>
              {header}
            </div>
            {children}
        </Container>
  );
}