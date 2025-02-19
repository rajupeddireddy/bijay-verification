import React , {useState} from "react";
import Header from "../../components/Header/Header";
import "./index.css";
import CustomTextField from "../../components/TextField/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import InputFileUpload from '../../components/Fileupload/FileUpload'
import {Box, Label} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Form() {
  const [fileEntries, setFileEntries] = useState([{ fileName: '', file: null, url:null }])

  const getS3FileUrl = async (newFile) => {
    const file=new FormData();
    file.append('file',newFile)
    file.append('type',"MOU")
    try {
        const response = await fetch(`/file/upload`,file)
        const s3Url = await response.data.data.s3Url
        return s3Url

        
    } catch (error) {
        alert(`${error}, Please Reupload MOU`)
    }
  }

  
  const handleFileNameChange = (index, value) => {
    setFileEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, fileName: value } : entry
      )
    );
  };

  const handleAddMoreFiles = () => {
    setFileEntries([...fileEntries, { fileName: '', file: null, url:null }]);

  }

  const handleRemoveFiles =(index) => {
    setFileEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  }

  const handleFileChange = async (index, file) => {
    const url =  await getS3FileUrl(file)
    setFileEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, file, url } : entry
      )
    );
  };

  const hanldeClearFile = () => {
    setFileEntries([{ fileName: '', file: null, url:null }])
  }

  return (
    <div>
      <form className="form">
        <Typography sx={{fontSize: '20px', fontWeight: 'bold'}}>BJ25000010</Typography>
        <Typography  sx={{fontSize: '20px', fontWeight: 'bold'}}>Applicant: Raju Peddireddi</Typography>
        <div>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center" }}
          >
            <FormLabel id="demo-radio-buttons-group-label">House</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Own"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel value="own" control={<Radio />} label="Own" />
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center", mb:2 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Aaadhar</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="verified"
                control={<Radio />}
                label="Verified"
              />
              <FormControlLabel
                value="notVerified"
                control={<Radio />}
                label="Not Verified"
              />
              
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center" , mb:2 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">PAN</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="verified"
                control={<Radio />}
                label="Verified"
              />
              <FormControlLabel
                value="notVerified"
                control={<Radio />}
                label="Not Verified"
              />
            </RadioGroup>
          </FormControl>
    
          <Box sx={{display:'flex', flexDirection: 'column', gap:1, mb:3}}>
            <Typography sx={{textAlign: 'start'}}>Job/Business</Typography>
            <TextField id="profession" label="Profession" variant="outlined" />
            <TextField id="income" label="Income" variant="outlined" />
          </Box>
          <Typography sx={{textAlign:'start'}}>Upload Files</Typography>
          {/* <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', mt:1}}>
            <TextField id="1" label="File Name" variant="outlined" size='small'/>
            <input type="file" style={{marginLeft: '5px'}}/>
            <ControlPointIcon sx={{cursor: 'pointer'}}/>
          </Box> */}

            {fileEntries?.map((entry, index) => {
              return (
                <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                  <TextField
                    type="text"
                    size='small'
                    placeholder="Enter File Name"
                    value={entry.fileName}
                    onChange={(e) => handleFileNameChange(index, e.target.value)}
                    style={{ maxWidth: 230, marginRight: '10px' }}
                  />
                  <input 
                    type="file"
                    name="file1"
                    id="logo"
                    placeholder="Institute Contact here"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    style={{ marginLeft:'5px',width: 300,}}
                    
                  />
                  {index !==0 && <RemoveCircleOutlineIcon sx={{cursor:'pointer'}} onClick={() => handleRemoveFiles(index)}  fontSize='small'/>}
                  <AddCircleIcon sx={{cursor:'pointer'}} onClick={handleAddMoreFiles} fontSize='small'/>
                </Box>
              )
            })}

          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" , mb:2, mt:4 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">File Satisfaction</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
              />
              
            </RadioGroup>
          </FormControl>
          <textarea rows={"5"}  placeholder="Comments" style={{width: '100%'}}></textarea>
        </div>
      </form>
      <form className="form">
        <Typography  sx={{fontSize: '20px', fontWeight: 'bold'}}>Co-Applicant 1: Vishnu Vardha Reddy</Typography>
        <div>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center" }}
          >
            <FormLabel id="demo-radio-buttons-group-label">House</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Own"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel value="own" control={<Radio />} label="Own" />
              <FormControlLabel value="rent" control={<Radio />} label="Rent" />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center", mb:2 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Aaadhar</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="verified"
                control={<Radio />}
                label="Verified"
              />
              <FormControlLabel
                value="notVerified"
                control={<Radio />}
                label="Not Verified"
              />
              
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "row",justifyContent: 'space-between', alignItems: "center" , mb:2 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">PAN</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="verified"
                control={<Radio />}
                label="Verified"
              />
              <FormControlLabel
                value="notVerified"
                control={<Radio />}
                label="Not Verified"
              />
            </RadioGroup>
          </FormControl>
    
          <Box sx={{display:'flex', flexDirection: 'column', gap:1, mb:3}}>
            <Typography sx={{textAlign: 'start'}}>Job/Business</Typography>
            <TextField id="profession" label="Profession" variant="outlined" />
            <TextField id="income" label="Income" variant="outlined" />
          </Box>
          <Typography sx={{textAlign:'start'}}>Upload Files</Typography>
          {/* <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', mt:1}}>
            <TextField id="1" label="File Name" variant="outlined" size='small'/>
            <input type="file" style={{marginLeft: '5px'}}/>
            <ControlPointIcon sx={{cursor: 'pointer'}}/>
          </Box> */}

            {fileEntries?.map((entry, index) => {
              return (
                <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                  <TextField
                    type="text"
                    size='small'
                    placeholder="Enter File Name"
                    value={entry.fileName}
                    onChange={(e) => handleFileNameChange(index, e.target.value)}
                    style={{ maxWidth: 230, marginRight: '10px' }}
                  />
                  <input 
                    type="file"
                    name="file1"
                    id="logo"
                    placeholder="Institute Contact here"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    style={{ marginLeft:'5px',width: 300,}}
                    
                  />
                  {index !==0 && <RemoveCircleOutlineIcon sx={{cursor:'pointer'}} onClick={() => handleRemoveFiles(index)}  fontSize='small'/>}
                  <AddCircleIcon sx={{cursor:'pointer'}} onClick={handleAddMoreFiles} fontSize='small'/>
                </Box>
              )
            })}

          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" , mb:2, mt:4 }}
          >
            <FormLabel id="demo-radio-buttons-group-label">File Satisfaction</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ display: "flex", flexDirection: "row", ml: 2 }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
              />
              
            </RadioGroup>
          </FormControl>
          <textarea rows={"5"}  placeholder="Comments" style={{width: '100%'}}></textarea>
        </div>
      </form>
    </div>
  );
}
