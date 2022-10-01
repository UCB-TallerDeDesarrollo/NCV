import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function ListContainer({children,title=""}) {
  return (
        <Box sx={{bgcolor:'#ffff', padding:4, margin:3, borderRadius:3, boxShadow: 2, width:0.75}}>
            <h4>{title}</h4>
            {children}
        </Box>
  );
}