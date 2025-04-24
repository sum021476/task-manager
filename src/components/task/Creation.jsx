import React, { useContext, useState } from 'react'
import { Services } from '../services/Services'
import { ContextApi } from '../context/Context'
import styles from "./CreateTask.module.css"
import { useNavigate } from 'react-router-dom'
const Creation = () => {
  let navigate=useNavigate()
  let{globalState,setGlobalState}=useContext(ContextApi)
    let[state,setState]=useState({
        title:"",
        content:""
    })
    let handleChange=(e)=>{
        let{name,value}=e.target
        setState({...state,[name]:value})
    }
    let handleSubmit=(e)=>{
        e.preventDefault()
        console.log(state)
    let payload={
      title:title,
      content:content,
      userid:globalState.id
    }
    console.log(payload)
    Services.createTaskUser(payload)
    navigate("/GetTask")
    }
    let{title,content}=state
  return (
    <form onSubmit={handleSubmit} className={styles.createTaskForm}>
      <h2 className={styles.title}>Create Task</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="" onChange={handleChange} value={title} />
      </div>
      <div>
        <label htmlFor="content"> Content:</label>
        <textarea name="content" id="content" rows={10} cols={20} onChange={handleChange} value={content}></textarea>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}

export default Creation
