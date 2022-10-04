import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

export default function ButtonPrimary({label, onClick, id}) {
    return (
        <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={{ 
            borderRadius: 40, 
            background: "#5CD4E2",
            color: "#023859", 
            boxShadow: 3,
            fontWeight: 'bold',
            textTransform: 'none',
            px:4
            }}>{label}
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
            }}>{label}
            </Button>
    );
  }