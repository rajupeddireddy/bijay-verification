import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({element}) {
  const user = sessionStorage.getItem('user')

  return (
    user ? element  :<Navigate to='/' replace/>
  )
}
