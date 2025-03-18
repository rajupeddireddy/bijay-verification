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
import DeleteIcon from "@mui/icons-material/Delete";

const personsOptions = [
  { label: "Applicant" },
  { label: "Father" },
  { label: "Mother" },
  { label: "Wife" },
  { label: "Brother" },
  { label: "Neighbour" },
  { label: "Co Applicant" },
  { label: "Others" },
];

export default function Form() {
  const [formData, setFormData] = useState({
    houseType: "",
    houseAddress: "",
    aadhaarStatus: "",
    panStatus: "",
    employment: "",
    employerName: "",
    salary: "",
    refNumbers: { ref1: "", ref2: "" },
    email: "",
    personMeet: "",
    personName: "",
    comments: "",
    fileSatisfaction: "",
    fileEntries: [],
  });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Reference Number Change Separately
  const handleRefChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      refNumbers: { ...prev.refNumbers, [name]: value },
    }));
  };

  // Handle Autocomplete
  const handleAutocompleteChange = (event, value) => {
    setFormData((prev) => ({ ...prev, personMeet: value?.label || "" }));
  };

  // Handle File Upload
  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      fileEntries: [...prev.fileEntries, file],
    }));
  };

  // Handle File Removal
  const handleRemoveFiles = (index) => {
    setFormData((prev) => ({
      ...prev,
      fileEntries: prev.fileEntries.filter((_, i) => i !== index),
    }));
  };

  // Submit Form
  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2, pb: 3 }}>
      <Typography variant="subtitle1">
        Application Id : <span style={{ fontWeight: "bold" }}>BJ25000010</span>
      </Typography>
      <Typography variant="subtitle1">
        Loan Type: <span style={{ fontWeight: "bold" }}>Personal Loan</span>
      </Typography>
      <Typography variant="subtitle1">
        Applicant Name:{" "}
        <span style={{ fontWeight: "bold" }}>Raju Peddireddi</span>
      </Typography>

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
          name="houseType"
          value={formData.houseType}
          onChange={handleChange}
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
        name="houseAddress"
        value={formData?.houseAddress}
        onChange={handleChange}
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
          name="aadhaarStatus"
          value={formData.aadhaarStatus}
          onChange={handleChange}
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
          name="panStatus"
          value={formData.panStatus}
          onChange={handleChange}
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
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
          name="employment"
          value={formData.employment}
          onChange={handleChange}
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
      {formData?.employment === "salaried" && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Employer Name"
            variant="outlined"
            fullWidth
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
          />
          <TextField
            label="Salary"
            variant="outlined"
            type="number"
            fullWidth
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </Stack>
      )}
      {formData?.employment === "self-employed" && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Type of Business"
            variant="outlined"
            fullWidth
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
          />
          <TextField
            label="Income per month"
            variant="outlined"
            type="number"
            fullWidth
            name="salary"
            value={formData.salary}
            onChange={handleChange}
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
          name="ref1"
          value={formData.refNumbers.ref1}
          onChange={handleRefChange}
        />
        <TextField
          label="Rf Phone 2"
          variant="outlined"
          type="number"
          fullWidth
          name="ref2"
          value={formData.refNumbers.ref2}
          onChange={handleRefChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Stack>

      {/* Person Met */}
      <Autocomplete
        options={personsOptions}
        value={formData.personMeet}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField {...params} label="Person Met" fullWidth />
        )}
        sx={{ mt: 2 }}
      />
      {formData.personMeet && (
        <TextField
          label="Person Name"
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          name="personName"
          value={formData.personName}
          onChange={handleChange}
        />
      )}

      {/* File Upload */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography sx={{ textAlign: "start" }}>Upload Files</Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ ml: 3 }}
        >
          Upload
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </Button>
        {formData?.fileEntries?.length > 0 && (
          <Typography sx={{ ml: 3, fontStyle: "italic" }}>
            Files Uploaded - {formData?.fileEntries?.length}
          </Typography>
        )}
      </Box>

      {/* Uploaded File List */}
      {formData?.fileEntries.map(
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
                style={{ width: "150px", height: "150px" }}
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
        name="comments"
        value={formData.comments}
        onChange={handleChange}
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
          name="fileSatisfaction"
          value={formData.fileSatisfaction}
          onChange={handleChange}
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}
