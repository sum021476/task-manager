import React, { createContext, useState } from 'react'
export let ContextApi=createContext()
let {Provider}=ContextApi
const Context = ({children}) => {
    let[globalState,setGlobalState]=useState("")
  return (
    <Provider value={{globalState,setGlobalState}}>
      {children}
    </Provider>
  )
}

export default Context
