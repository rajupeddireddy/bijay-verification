import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Stack,
  IconButton,
} from "@mui/material";
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
  const [fileEntries, setFileEntries] = useState([]);
  const [employment, setEmployment] = useState("salaried");

  const handleFileChange = (file) => {
    
    //const url = URL.createObjectURL(file); // Simulating file upload
    setFileEntries((prev) =>[...prev, file] );
  };

  const handleAddMoreFiles = () => {
    setFileEntries([...fileEntries, { fileName: "", file: null, url: null }]);
  };

  const handleRemoveFiles = (index) => {
    setFileEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEmployment = (e) => {
    setEmployment(e.target.value);
  };
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="subtitle1" >Application Id : <span style={{fontWeight:'bold'}}>BJ25000010</span></Typography>
      <Typography variant="subtitle1">Loan Type: <span style={{fontWeight:'bold'}}>Personal Loan</span></Typography>
      <Typography variant="subtitle1">Applicant Name: <span style={{fontWeight:'bold'}}>Raju Peddireddi</span></Typography>

      {/* House Ownership */}
      <FormControl
        fullWidth
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ width: "40%", textAlign: "start" }}>House</FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <FormControlLabel
            value="own"
            control={<Radio />}
            label="Own"
            sx={{ width: "45%" }}
          />
          <FormControlLabel
            value="rent"
            control={<Radio />}
            label="Rent"
            sx={{ width: "45%" }}
          />
        </RadioGroup>
      </FormControl>

      {/* Address */}
      <TextField
        label="House Address"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        sx={{ mt: 2 }}
      />

      {/* Aadhaar Verification */}
      <FormControl
        fullWidth
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ width: "40%", textAlign: "start" }}>Aadhaar</FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
            flexWrap: "nowrap",
          }}
        >
          <FormControlLabel
            value="verified"
            control={<Radio />}
            label="Verified"
            sx={{ width: "45%" }}
          />
          <FormControlLabel
            value="notVerified"
            control={<Radio />}
            label="Not Verified"
            sx={{ width: "45%" }}
          />
        </RadioGroup>
      </FormControl>

      {/* Pan Verification */}
      <FormControl
        fullWidth
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ width: "40%", textAlign: "start" }}>PAN</FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
            flexWrap: "nowrap",
          }}
        >
          <FormControlLabel
            value="verified"
            control={<Radio />}
            label="Verified"
            sx={{ width: "45%" }}
          />
          <FormControlLabel
            value="notVerified"
            control={<Radio />}
            label="Not Verified"
            sx={{ width: "45%" }}
          />
        </RadioGroup>
      </FormControl>

      {/* Employment Status */}
      <FormControl
        fullWidth
        sx={{ mt: 2, display: "flex", flexDirection: "column" }}
      >
        <FormLabel sx={{ width: "40%", textAlign: "start" }}>
          Employment
        </FormLabel>
        <RadioGroup
          onChange={handleEmployment}
          value={employment}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <FormControlLabel
            value="salaried"
            control={<Radio />}
            label="Salaried"
          />
          <FormControlLabel
            value="self-employed"
            control={<Radio />}
            label="Self Employed"
          />
          <FormControlLabel
            value="unemployed"
            control={<Radio />}
            label="Un Employed"
          />
        </RadioGroup>
      </FormControl>

      {/* Job & Income */}
      {employment === "salaried" && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="Employer Name" variant="outlined" fullWidth />
          <TextField
            label="Salary"
            variant="outlined"
            type="number"
            fullWidth
          />
        </Stack>
      )}
      {employment === "self-employed" && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="Type of Business" variant="outlined" fullWidth />
          <TextField
            label="Income per month"
            variant="outlined"
            type="number"
            fullWidth
          />
        </Stack>
      )}

      {/* Contact Details */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Typography sx={{ textAlign: "start" }}>Ref Phone Numbers</Typography>
        <TextField
          label="Rf Phone 1"
          variant="outlined"
          type="number"
          fullWidth
        />
        <TextField
          label="Rf Phone 2"
          variant="outlined"
          type="number"
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
        />
      </Stack>

      {/* Person Met */}
      <Autocomplete
        options={personsOptions}
        renderInput={(params) => (
          <TextField {...params} label="Person Met" fullWidth />
        )}
        sx={{ mt: 2 }}
      />

      {/* File Upload */}
      <Box sx={{ display: "flex", flexDirection: "row", alignItems:'center',  mt: 2 }}>
        <Typography sx={{ textAlign: "start" }}>Upload Files</Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ml:3}}
        >
          Upload
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </Button>
        {fileEntries?.length > 0  && <Typography sx={{ml:3, fontStyle:'italic'}}>Files Uploaded - {fileEntries?.length}</Typography>}
      </Box>

      {/* Uploaded File List */}
      {fileEntries.map(
        (file, index) =>
          file && (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                bgcolor: "#f5f5f5",
                mt: 1,
                borderRadius: 1,
              }}
            >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "150px", height: "150px", }}
            />
            <Typography fontSize={12}>{file.name}</Typography>
              <IconButton size="small" onClick={() => handleRemoveFiles(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )
      )}

      {/* Comments */}
      <TextField
        label="Comments"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        sx={{ mt: 2 }}
      />

      {/* File Satisfaction */}
      <FormControl
        fullWidth
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ width: "40%", textAlign: "start" }}>
          File Satisfaction
        </FormLabel>
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "60%",
            flexWrap: "nowrap",
          }}
        >
          <FormControlLabel
            value="positive"
            control={<Radio />}
            label="Positive"
          />
          <FormControlLabel
            value="negative"
            control={<Radio />}
            label="Negative"
          />
        </RadioGroup>
      </FormControl>
      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit
      </Button>
    </Box>
  );
}
