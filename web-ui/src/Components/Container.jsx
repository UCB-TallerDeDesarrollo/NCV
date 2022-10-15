import Box from '@mui/material/Box';
export default function Container({children}) {
  return (
        <Box sx={{bgcolor:'#ffff', padding:4, margin:3, borderRadius:3, boxShadow: 2, width:0.75}}>
            {children}
        </Box>
  );
}