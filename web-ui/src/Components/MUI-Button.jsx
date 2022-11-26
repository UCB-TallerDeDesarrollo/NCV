import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

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
  export function ButtonSecondary({label, onClick, id, sx={}}) {
    sx.borderRadius = sx.borderRadius ?? 40
    sx.background = sx.background ?? "#E0E0E0"
    sx.color = sx.color ?? "#023859"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.marginRight = sx.marginRight ?? 2
    sx.marginLeft = sx.marginLeft ?? 2
    sx.marginBottom = sx.marginBottom ?? 2
    sx.fontWeight = sx.fontWeight ?? "bold"
    sx.textTransform = sx.textTransform ?? "none"
    sx["&:hover"] = sx["&:hover"] ?? {
      background: "#cecccc"
    }
    return (
      <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={sx}> {label} </Button>
    );
  }

  export function ButtonDanger({label, onClick, id, sx={}}) {
    sx.borderRadius = sx.borderRadius ?? 40
    sx.background = sx.background ?? "#DB524B"
    sx.color = sx.color ?? "#FFFFFF"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.marginRight = sx.marginRight ?? 2
    sx.marginLeft = sx.marginLeft ?? 2
    sx.marginBottom = sx.marginBottom ?? 2
    sx.fontWeight = sx.fontWeight ?? "bold"
    sx.textTransform = sx.textTransform ?? "none"
    sx["&:hover"] = sx["&:hover"] ?? {
      background: "#c63e39"
    }
    return (
      <Button variant="contained" type="input" label={label} onClick={onClick} id={id} sx={sx}> {label} </Button>
  );
  }

  export function ButtonLoading(props) {
    const {label, loading, id, loadingLable, ...rest} = props;

    const sx = {
        borderRadius: 40, 
        background: "#5CD4E2",
        color: "#023859", 
        boxShadow: 3,
        marginRight: 2,
        marginLeft: 2,
        fontWeight: 'bold',
        textTransform: 'none',
    }

    return (
      <LoadingButton loading={loading} variant="contained" id={id} sx={sx} loadingIndicator={loadingLable} {...rest}>
        {label}
      </LoadingButton>
    );
  }

  export function ButtonPrimaryEditIcon({onClick, sx={}}) {
    sx.background = sx.background ?? "#5CD4E2"
    sx.color = sx.color ?? "#023859"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.marginLeft = sx.marginLeft ?? 0
    sx["&:hover"] = sx["&:hover"] ?? {
        background: "#389CFC"
    }
    return (
      <IconButton aria-label="delete" size="small" className={"delete-assetState-button"} onClick={onClick} sx={sx}>
        <EditIcon fontSize="small" />
      </IconButton>
    );
  }

  
  export function ButtonPrimaryDeleteIcon({onClick, sx={}}) {
    sx.background = sx.background ?? "#E0544C"
    sx.color = sx.color ?? "white"
    sx.boxShadow = sx.boxShadow ?? 3
    sx.marginLeft = sx.marginLeft ?? 0
    sx["&:hover"] = sx["&:hover"] ?? {
        background: "#C82C2C"
    }
    return (
      <IconButton aria-label="delete" size="small" className={"delete-button"} onClick={onClick} sx={sx}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    );
  }