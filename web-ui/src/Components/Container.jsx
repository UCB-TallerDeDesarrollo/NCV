import Box from '@mui/material/Box';
import { bgcolor } from '@mui/system';
export default function Container({children,sx={}}) {
    let boxSx = {
        bgcolor :'#ffff',
        padding : 4,
        margin : 1.5,
        borderRadius : 3,
        boxShadow : 2,
        width : 0.75
    };
    Object.keys(sx).forEach(k => {
        boxSx[k] = sx[k];
    });
    return (
        <Box sx={boxSx}>
            {children}
        </Box>
    );
}