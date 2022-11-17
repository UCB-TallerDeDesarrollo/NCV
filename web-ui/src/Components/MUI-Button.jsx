import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2';

export default function ButtonPrimary({label, onClick, id, sx={}}) {
    sx.borderRadius = sx.borderRadius ?? 40
    sx.background = sx.background ?? "#5CD4E2"
    sx.color = sx.color ?? "#023859"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.fontWeight = sx.fontWeight ?? 'bold'
    sx.textTransform = sx.textTransform ?? 'none'
    sx.px = sx.px ?? 4
    sx.marginLeft = sx.marginLeft ?? 0
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
            marginRight: 2,
            marginLeft: 2,
            fontWeight: 'bold',
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


  export function ButtonPrimaryEditIcon({onClick, sx={}}) {
    return (
      <IconButton aria-label="delete" size="small" className={"delete-assetState-button"} onClick={onClick} sx={sx}>
        <EditIcon fontSize="small" />
      </IconButton>
    );
  }