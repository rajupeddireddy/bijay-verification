import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import logo from '../../assets/images/bijaylogo.png'
import { axiosInstance } from "../../helpers/axios.tsx";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem("user");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false)
  const [error, setError] = useState<string | null>()
  const [loginError, setLoginError] = useState<string | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      navigate("/userSearch"); // Redirect to another page if already logged in
    }
  }, [user, navigate]);

  const validateEmail = email => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };


  const handleGetOtp = async () => {
    if(emailVerified){
      handleLogin()
      return
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return

    }
    

    const body = {
      emailId: email
    }
    setLoading(true)
    try {
    
      const res = await axiosInstance.post("/auth/trigger-otp", body)
      const data = res.data
      console.log(data, 'response')
      if(data?.message === "Successful"){
        setEmailVerified(true)
        setError(null)
      }else{
        setError(data?.message)
      }
    } catch (e) {
      console.log(`Error, sending otp, ${e}`)
      setError(e?.response?.data?.message)
    }finally{
      setLoading(false)
    }
    
  };


  const handleLogin = async () => {
    const body = {
      emailId: email,
      otp: otp
    }
    setLoading(true)
    try {
    
      const res = await axiosInstance.post("/auth/verify-email-login", body)
      const data = res.data
      console.log(data, 'response')
      if(data?.data){
        localStorage.setItem('user', JSON.stringify(data?.data))
        navigate('/userSearch')
      }else{
        setLoginError("Invalid user/otp")
      }
    } catch (e) {
      console.log(`Error, sending otp, ${e}`)
      setLoginError("Invalid user/otp")
    }finally{
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box
          p={3}
          sx={{paddingBottom:5}}
          boxShadow={3}
          borderRadius={2}
          textAlign="center"
          width="100%"
          bgcolor="white"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: '200px', marginBottom: 36 }}
          />
          <Typography variant="h5" gutterBottom sx={{textAlign:'start'}}>
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            error={!!error}
            helperText={error}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailVerified && 
            <TextField
              label="Enter Otp"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          }
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGetOtp}
            sx={{ mt: 2 }}
            loading={loading}
          >
           {emailVerified ? "Login": "Get Otp"}
          </Button>
          {loginError && <Typography sx={{fontSize:'14px', mt:3, color: 'red'}}>{loginError}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;