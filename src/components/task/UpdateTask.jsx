import React, { useContext, useState } from 'react'
import styles from "./UpdateTask.module.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { ContextApi } from '../context/Context'
import { Services } from '../services/Services'
const UpdateTask = () => {
    let{globalState,setGlobalState}=useContext(ContextApi)
    let navigate=useNavigate()
    let{state}=useLocation()    
    let[data,setData]=useState({
            title:state.title,
            content:state.content
        })      
        let handleChange=(e)=>{
            let{name,value}=e.target
            setData((preval)=>({...preval,[name]:value}))
            console.log(data)
        }
        let handleSubmit=(e)=>{
            e.preventDefault()
            let{title,content}=data
            let payload={title,content,userid:globalState.id}
         Services.updateTaskUser(state.id,payload)
            navigate("/GetTask")
    }
    
  return (
    <form onSubmit={handleSubmit} className={styles.UpdateTaskForm}>
      <h2 className={styles.title}>Update Task</h2>
         <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title"  onChange={handleChange} value={data.title} />
      </div>
      <div>
        <label htmlFor="content"> Content:</label>
        <textarea name="content"  rows={10} cols={20} onChange={handleChange} value={data.content}></textarea>
      </div>
      <div>
        <button>update</button>
      </div>
    </form>
  )
}

export default UpdateTask
