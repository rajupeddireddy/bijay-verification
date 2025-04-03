import React from 'react'
import logo from '../../assets/images/bijaylogo.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigation = useNavigate()
  const handleLogout = () => {
      sessionStorage.removeItem("user")
      navigation("/")
  }
  return (
    <nav style={{paddingTop:'12px', paddingBottom:'12px', display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
      <img src={logo} alt='logo' style={{width:'180px'}}/>
      <Button size='small' variant='outlined' onClick={handleLogout} sx={{textTransform:'none'}}>Logout</Button>
    </nav>
  )
}
