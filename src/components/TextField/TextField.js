import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function CustomTextField({label='' ,type='text', handleTextFieldOnChange, value='', disabled=false, error=false, helperText="", styles}) {

  return (

      <TextField 
        onChange={(e) => handleTextFieldOnChange(e.target.value)}
        value={value || ''}
        type={type}
        label={label}
        error={error}
        helperText={helperText}
        disabled={disabled}
        size='small'
        InputProps={{
          style:{fontFamily:'Outfit'},
        }}
        InputLabelProps={{
          // mt:disabled?-0.5:0,
            sx: { bgcolor: "#fff8f4",fontFamily:'Outfit', fontWeight:'bold', borderRadius:'5px', fontSize:'14px', lineHeight:'20.25px', padding:type==='date' ? '2px 25px 2px 8px': '2px 8px 2px 8px', color:'#000', },  
            
          }}
        sx={{width:350, mb:2, ...styles,
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
            },}}
      />
  );
}