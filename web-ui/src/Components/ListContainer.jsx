import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'
export default function ListContainer({children,title="",header={}}) {
  return (
        <Box sx={{bgcolor:'#ffff', padding:4, margin:3, borderRadius:3, boxShadow: 2, width:0.75}}>
            <div style={{ marginBottom: 10,display:'flex', alignItems:'center', flexDirection:'row', width:'100%',justifyContent:'space-between' }}>
              <h4 style={{margin:0,padding:0}}>{title}</h4>
              {header}
            </div>
            {children}
        </Box>
  );
}