import React, { useContext, useState } from 'react'
import { Services } from './services/Services'
import { ContextApi } from './context/Context'
import { Link, useNavigate } from 'react-router-dom'
import loginStyles from "./Login.module.css";
const Login = () => {
    let {globalState,setGlobalState}=useContext(ContextApi)
    let navigate=useNavigate()
let[state,setState]=useState({
    email:"",
    password:""
})
let handleChange=(e)=>{
    let{name,value}=e.target
    setState({...state,[name]:value})
}
let handleSubmit=(e)=>{
    e.preventDefault()
    let {email,password}=state
    let payload={email,password};
 (async()=>{
  let data=await Services.loginUser(payload)
  data?setGlobalState(data):setGlobalState("")
  console.log(data)
  window.sessionStorage.setItem("Token",data.id)
  data?navigate("/getTask"):navigate("/")
 })()
}
  return (
    <>
     <form action="" onSubmit={handleSubmit} className={loginStyles.loginForm}>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={handleChange} />
        </div>
        <div>
            <input type="submit" value="Submit" />
        </div>
        <Link to="/register">Create user?</Link>
        </form> 
    </>
  )
}

export default Login
