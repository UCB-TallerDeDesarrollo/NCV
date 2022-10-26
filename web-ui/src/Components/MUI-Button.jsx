import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

export default function ButtonPrimary({label, onClick, id, sx={}}) {
    sx.borderRadius = sx.borderRadius ?? 40
    sx.background = sx.background ?? "#5CD4E2"
    sx.color = sx.color ?? "#023859"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.fontWeight = sx.fontWeight ?? 'bold'
    sx.textTransform = sx.textTransform ?? 'none'
    sx.px = sx.px ?? 4
    return (
        <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={sx}>{label}
            </Button>
    );
  }
  export function ButtonSecondary({label, onClick, id}) {
    return (

        <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={{ 
            borderRadius: 40, 
            background: "#E0E0E0",
            color: "#023859", 
            boxShadow: 3,
            fontWeight: 'bold',
            marginBottom: 2,
            textTransform: 'none',
            "&:hover": {
              background: "#cecccc"
            }
            }}>{label}
            </Button>
    );
  }

  export function ButtonDanger({label, onClick, id}) {
    return (

        <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={{ 
            borderRadius: 40, 
            background: "#DB524B",
            color: "#FFFFFF", 
            boxShadow: 3,
            fontWeight: 'bold',
            marginBottom: 2,
            textTransform: 'none',
            "&:hover": {
              background: "#c63e39"
            }
            }}>{label}
            </Button>
    );
  }