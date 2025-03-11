import React, { useState } from "react";
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Button, Typography, Autocomplete, Stack, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const personsOptions = [
  { label: "Applicant" },
  { label: "Father" },
  { label: "Mother" },
  { label: "Wife" },
  { label: "Brother" },
  { label: "Neighbour" },
  { label: "Co Applicant" },
];

export default function Form() {
  const [fileEntries, setFileEntries] = useState([{ fileName: "", file: null, url: null }]);

  const handleFileChange = (index, file) => {
    const url = URL.createObjectURL(file); // Simulating file upload
    setFileEntries((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, file, url } : entry))
    );
  };

  const handleAddMoreFiles = () => {
    setFileEntries([...fileEntries, { fileName: "", file: null, url: null }]);
  };

  const handleRemoveFiles = (index) => {
    setFileEntries((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h6">BJ25000010</Typography>
      <Typography variant="subtitle1">Applicant: Raju Peddireddi</Typography>
      <Typography variant="subtitle1">Loan Type: Personal Loan</Typography>

      {/* House Ownership */}
      <FormControl fullWidth sx={{ mt: 2, display:'flex', flexDirection:'row', alignItems:'center',  }}>
        <FormLabel sx={{width:'40%', textAlign:'start'}}>House</FormLabel>
        <RadioGroup  sx={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-between',  width:'60%'}}>
          <FormControlLabel value="own" control={<Radio />} label="Own" />
          <FormControlLabel value="rent" control={<Radio />} label="Rent" />
        </RadioGroup>
      </FormControl>

      {/* Aadhaar Verification */}
      <FormControl fullWidth sx={{ mt: 2,display:'flex', flexDirection:'row', alignItems:'center',   }}>
        <FormLabel sx={{width:'40%', textAlign:'start'}}>Aadhaar</FormLabel>
        <RadioGroup  sx={{display:'flex', flexDirection:'row', alignItems:'center',justifyContent:'space-between',  width:'60%', flexWrap:'nowrap'}}>
          <FormControlLabel value="verified" control={<Radio />} label="Verified" />
          <FormControlLabel value="notVerified" control={<Radio />} label="Not Verified" />
        </RadioGroup>
      </FormControl>

      {/* Employment Status */}
      <FormControl fullWidth sx={{ mt: 2, display:'flex', flexDirection:'row', alignItems:'center', }}>
        <FormLabel sx={{width:'40%', textAlign:'start'}}>Employment</FormLabel>
        <RadioGroup sx={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems:'center',width:'60%',  flexWrap:'nowrap' }}>
          <FormControlLabel value="salaried" control={<Radio />} label="Salaried" />
          <FormControlLabel value="self-employed" control={<Radio />} label="Self Employed" />
        </RadioGroup>
      </FormControl>

      {/* Job & Income */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField label="Profession" variant="outlined" fullWidth />
        <TextField label="Income" variant="outlined" type="number" fullWidth />
      </Stack>

      {/* Contact Details */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField label="Phone 1" variant="outlined" type="number" fullWidth />
        <TextField label="Phone 2" variant="outlined" type="number" fullWidth />
      </Stack>

      {/* Address */}
      <TextField label="House Address" variant="outlined" multiline rows={3} fullWidth sx={{ mt: 2 }} />

      {/* Person Met */}
      <Autocomplete
        options={personsOptions}
        renderInput={(params) => <TextField {...params} label="Person Met" fullWidth />}
        sx={{ mt: 2 }}
      />

      {/* File Upload */}
      <Typography sx={{ mt: 2 }}>Upload Files</Typography>
      {fileEntries.map((entry, index) => (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }} key={index}>
          <TextField
            size="small"
            placeholder="Enter File Name"
            value={entry.fileName}
            onChange={(e) => {
              const newEntries = [...fileEntries];
              newEntries[index].fileName = e.target.value;
              setFileEntries(newEntries);
            }}
            sx={{ flex: 1 }}
          />
          <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
            Upload
            <input type="file" hidden onChange={(e) => handleFileChange(index, e.target.files[0])} />
          </Button>
          {index !== 0 && (
            <IconButton color="error" onClick={() => handleRemoveFiles(index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
          <IconButton color="primary" onClick={handleAddMoreFiles}>
            <AddCircleIcon />
          </IconButton>
        </Stack>
      ))}

      {/* Uploaded File List */}
      {fileEntries.map(
        (entry, index) =>
          entry.file && (
            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1, bgcolor: "#f5f5f5", mt: 1, borderRadius: 1 }}>
              <Typography variant="body2">{entry.file.name}</Typography>
              <IconButton size="small" onClick={() => handleRemoveFiles(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
      )}

      {/* File Satisfaction */}
      <FormControl fullWidth sx={{ mt: 2, display:'flex', flexDirection:'row', alignItems:'center' }}>
        <FormLabel  sx={{width:'40%', textAlign:'start'}}>File Satisfaction</FormLabel>
        <RadioGroup sx={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems:'center',width:'60%',  flexWrap:'nowrap' }}>
          <FormControlLabel value="positive" control={<Radio />} label="Positive" />
          <FormControlLabel value="negative" control={<Radio />} label="Negative" />
        </RadioGroup>
      </FormControl>

      {/* Comments */}
      <TextField label="Comments" variant="outlined" multiline rows={3} fullWidth sx={{ mt: 2 }} />

      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
}
