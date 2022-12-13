import MenuItem from '@mui/material/MenuItem'
import InputText from '../Components/InputText'

export default function Dropdown({name, id, options, selectedValue, required=false, setSelectedValue, helperText = "Seleccione un valor", onChangeF=null}) {
  let handleChange = (event, onChangeF) => {
    setSelectedValue(event.target.value)
    if(onChangeF!=null){
      onChangeF(event.target.value)
    }
 }
 if(!options) return (
  <>
      <InputText 
        required = {required}
        select
        id={id}      
        name={name} 
        label={name}       
        type="text"       
        value={selectedValue}
        helperText={helperText}            
        onChange={(event)=>handleChange(event, onChangeF)}
        >
          </InputText>
        </>
 )
 else{
    return (
      <>
      <InputText 
        required = {required}
        select
        id={id}      
        name={name} 
        label={name}       
        type="text"       
        value={selectedValue}
        helperText={helperText}            
        onChange={(event)=>handleChange(event, onChangeF)}
        >
          {options.map((option) => (
              <MenuItem  key={option.value} value={option.value}>
                {option.label}
              </MenuItem >
            ))}
          </InputText>
        </>
    );
  }
}

