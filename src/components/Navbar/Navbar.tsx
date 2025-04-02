import React from 'react'
import logo from '../../assets/images/bijaylogo.png'

export default function Navbar() {
  return (
    <nav style={{paddingTop:'12px', paddingBottom:'12px', display:'flex', justifyContent:'flex-start'}}>
      <img src={logo} alt='logo' style={{width:'180px'}}/>
    </nav>
  )
}
