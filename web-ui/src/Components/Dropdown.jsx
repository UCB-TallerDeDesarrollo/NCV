import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputText from '../Components/InputText'

export default function Dropdown({name, id, options, selectedValue, required=false, setSelectedValue, helperText = "Seleccione un valor"}) {
  var handleChange = (event) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value)
 }
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
      onChange={handleChange}
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

