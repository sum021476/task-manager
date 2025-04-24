import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Login'

const PrivateRoute = ({children}) => {
  
    let navigate=useNavigate()
    useEffect(()=>{
        if(!sessionStorage.getItem('Token')){
            navigate("/")
        }
    },[navigate])
  return (
    sessionStorage.getItem("Token")?<>{children}</>:<Login></Login>
  )
}

export default PrivateRoute
