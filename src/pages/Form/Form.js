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
import Navbar from "../../components/Navbar/Navbar.tsx";

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

  const [errors, setErros] = useState({});

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

  const formValidation = () => {
    let newErrors = {};
    if (!formData.houseType) newErrors.houseType = "*House type is required";
    if (!formData.houseAddress.trim())
      newErrors.houseAddress = "*Address is required";
    if (!formData.aadhaarStatus)
      newErrors.aadhaarStatus = "*Aadhaar status is required";
    if (!formData.panStatus) newErrors.panStatus = "*PAN status is required";
    if (!formData.employment)
      newErrors.employment = "Employment status is required";
    if (
      (formData.employment === "salaried" ||
        formData.employment === "self-employed") &&
      !formData.employerName.trim()
    )
      newErrors.employerName = "*Employer name is required";
    if (
      (formData.employment === "salaried" ||
        formData.employment === "self-employed") &&
      (!formData.salary || formData.salary <= 0)
    )
      newErrors.salary = "*Salary must be greater than 0";

    if (!/^\d{10}$/.test(formData.refNumbers.ref1))
      newErrors.ref1 = "*Reference number must be 10 digits";
    if (!/^\d{10}$/.test(formData.refNumbers.ref2))
      newErrors.ref2 = "*Reference number must be 10 digits";

    if (!formData.email.trim()) {
      newErrors.email = "*Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "*Invalid email format";
    }

    if (!formData.personMeet) newErrors.personMeet = "*Person met is required";
    if (!formData.comments.trim())
      newErrors.comments = "*Comments are required";
    if (!formData.fileSatisfaction)
      newErrors.fileSatisfaction = "*File satisfaction is required";

    setErros(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Form
  const handleSubmit = () => {
    if (formValidation()) {
      console.log("Form Data Submitted: ", formData);
      alert("Form submitted successfully!");
    } else {
      console.log("Validation Error: ", errors);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", pb: 3 }}>
      <Navbar />
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
      <Typography color="error" sx={{ textAlign: "start", fontSize: 12 }}>
        {errors.houseType}
      </Typography>

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
        error={!!errors.houseAddress}
        helperText={errors.houseAddress}
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
      <Typography color="error" sx={{ textAlign: "start", fontSize: 12 }}>
        {errors.aadhaarStatus}
      </Typography>

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
      <Typography color="error" sx={{ textAlign: "start", fontSize: 12 }}>
        {errors.panStatus}
      </Typography>

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
      <Typography color="error" sx={{ textAlign: "start", fontSize: 12 }}>
        {errors.employment}
      </Typography>

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
            error={!!errors.employerName}
            helperText={errors.employerName}
          />
          <TextField
            label="Salary"
            variant="outlined"
            type="number"
            fullWidth
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            error={!!errors.salary}
            helperText={errors.salary}
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
            error={!!errors.employerName}
            helperText={errors.employerName}
          />
          <TextField
            label="Income per month"
            variant="outlined"
            type="number"
            fullWidth
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            error={!!errors.salary}
            helperText={errors.salary}
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
          error={!!errors.ref1}
          helperText={errors.ref1}
        />
        <TextField
          label="Rf Phone 2"
          variant="outlined"
          type="number"
          fullWidth
          name="ref2"
          value={formData.refNumbers.ref2}
          onChange={handleRefChange}
          error={!!errors.ref2}
          helperText={errors.ref2}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Stack>

      {/* Person Met */}
      <Autocomplete
        options={personsOptions}
        value={formData.personMeet}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Person Met"
            fullWidth
            error={!!errors.personMeet}
            helperText={errors.personMeet}
          />
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
        error={!!errors.comments}
        helperText={errors.comments}
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
      <Typography color="error" sx={{ textAlign: "start", fontSize: 12 }}>
        {errors.fileSatisfaction}
      </Typography>

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
