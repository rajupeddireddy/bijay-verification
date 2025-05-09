import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import { axiosInstance } from "../../helpers/axios.tsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [applications, setApplications] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user') || "")
  const [loading, setLoading] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if(searchInput?.length < 5){
      return
    }
    setLoading(true)
    try {
      const res = await axiosInstance(`/users/basic-info?searchField=${searchInput}`, {
        headers:{
          Authorization: `Bearer ${user}`
        }
      });
      const data =  res.data;
      //console.log(data, 'response')
      if(data?.data?.length > 0){
        setApplications(data?.data)
        setNoResults(false); 
      }else{
        setApplications([])
        setNoResults(true); 
      }
      
    } catch (error) {
      console.error("Error fetching applications:", error);
    }finally{
      setLoading(false)
      setSearchInput("")
    }
  };

  return (
    <Container maxWidth="xs">
      <Navbar/>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2} maxHeight={'100vh'}>
        <Typography variant="h5" gutterBottom sx={{textAlign:'flex-start'}}>
          Search Application
        </Typography>
        <TextField
          label="Enter atleast 5 characters of Name/Id/phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSearch} sx={{ mt: 2 }} loading={loading}>
          Search
        </Button>

         {/* If API search returns an empty array, show this message */}
         {noResults && (
          <Typography sx={{ mt: 3, color: "red", fontSize: "14px" }}>
            Oops, No applications found!
          </Typography>
        )}
        
        {applications.length > 0 && (
          <Box sx={{ width: "100%", mt: 3 }}>
            {applications.map((app: any, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1, textAlign:'start', bgcolor:' #f2f2f2' }}>
                <Typography sx={{ fontSize: "14px" }}>ID: {app.applicationId}</Typography>
                <Typography sx={{ fontSize: "14px" }}>Name: {app.name}</Typography>
                <Typography sx={{ fontSize: "14px" }}>Loan Type: {app.instituteName}</Typography>
                <Typography sx={{ fontSize: "14px" }}>Amount: {app.courseFees}</Typography>
                <Typography sx={{ fontSize: "14px" }}>Status: {app.status}</Typography>
                <Typography sx={{ fontSize: "14px", textAlign: 'end', textDecoration:'underline', cursor:'pointer'}} color='primary' onClick={() => navigate("/form", {state: app})}>Complete verification →</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserSearch;
