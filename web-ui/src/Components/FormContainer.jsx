import Box from '@mui/material/Box';
export default function FormContainer({children,title=""}) {
    const sxContainer = {
        bgcolor:'#ffff',
        px:8,//padding-left and right
        py:5,//padding-top and bottom
        margin:3, 
        borderRadius:3, 
        boxShadow: 2, 
        width:0.35, 
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        flexDirection: 'column'
    };
    return (
          <Box sx={sxContainer}>
              <h4>{title}</h4>
              {children}
          </Box>
    );
  }