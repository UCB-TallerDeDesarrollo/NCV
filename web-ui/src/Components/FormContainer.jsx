import Box from '@mui/material/Box';
export default function FormContainer({children,title=""}) {
    return (
          <Box sx={{bgcolor:'#ffff', padding:4, margin:3, borderRadius:3, boxShadow: 2, width:0.75}}>
              <h4>{title}</h4>
              {children}
          </Box>
    );
  }