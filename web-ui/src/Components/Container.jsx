import Box from '@mui/material/Box';
export default function Container({children,sx={}}) {
    
    sx.bgcolor = sx.bgcolor ?? '#ffff';
    sx.padding = sx.padding ?? 4;
    sx.margin = sx.margin ?? 3;
    sx.borderRadius = sx.borderRadius ?? 3;
    sx.boxShadow = sx.boxShadow ?? 2;
    sx.width = sx.width ?? 0.75;

    return (
        <Box sx={sx}>
            {children}
        </Box>
    );
}