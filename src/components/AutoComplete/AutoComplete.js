import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

export default function CustomDropDown(props) {
  const {label, styles, options=[], id='', handleAutoCompleteChange, noOptionsText='No options', error=false, helperText='', disabled=false} = props
  const [internalValue, setInternalValue] = useState(props.value? props.value: "")

  const handleInputChange = (e, value) =>{
    console.log(value, 'value')
     setInternalValue(value)
     handleAutoCompleteChange(value)
  }
  return (
    <Autocomplete
      disabled={disabled}
      value={internalValue}
      disablePortal
      noOptionsText={noOptionsText}
      options={options.map(item => id==='instituteName' ? ({label: item.brandName, ...item}) : item)}
      sx={{  ...styles, "& .MuiPopper-root": {fontFamily:'Outfit'}}}
      size='small'
      onInputChange={handleInputChange}
      freeSolo
      renderInput={(params) =>
         <TextField {...params} label={label} 
         error={error}
         helperText={helperText}
         InputLabelProps={{
          sx: {fontFamily:'Outfit', bgcolor: "#fff8f4",fontWeight:'bold', borderRadius:'5px', fontSize:'14px', lineHeight:'20.25px', padding:'2px 8px 2px 8px', color:'#000'},
        }}
        
        sx={{minWidth:350, mb:2,
          "& label.Mui-focused": {
            color: "#000",
           
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#707C8B",
            },
            "&:hover fieldset": {
              borderColor: "#707C8B",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#707C8B",
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Outfit', // This applies the fontFamily to the input text
            },
          },}}
        
          />}
    
    />
  );
}
