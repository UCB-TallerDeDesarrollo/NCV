import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label, id, options }) {
  console.log('opciones:', options);
  //const [value] = React.useState('');
  //this.state.setState(SelectedVal);

  // handleChange = e => {
  //   var value = e.target.value;

  // this.setState({
  //   SeletedVal: value
  // });

  return (
    <div style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        id={id}
        // onChange={handleChange}
        // handleChange={this.handleChange}
        // selectedValue={this.state.SelectedVal}
        value={options[-1]}

      // onChange={handleChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
