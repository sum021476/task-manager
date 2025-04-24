import axios from 'axios'
 export let Services={
    getUsers: async () => {
        try {
          const response = await fetch("http://localhost:3000/users"); // Replace with actual API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          const users = await response.json();
          return users; // Expected format: [{ email: "user@example.com" }, ...]
        } catch (error) {
          console.error("Error fetching users:", error);
          return [];
        }
      },
    registerUser:async(payload)=>{
        axios.post("http://localhost:3000/users",payload)
    },
    loginUser:async(payload)=>{
        let {data}= await axios.get("http://localhost:3000/users",payload)
        let isAvailable= data.find((val)=>val.email==payload.email&&val.password==payload.password)
        let check=isAvailable?"valid":"invalid"
        console.log(check)
        return isAvailable
    },
    createTaskUser:async(payload)=>{
        axios.post("http://localhost:3000/task",payload)
    },
    getTaskUser:async(id)=>{
    let data=axios.get(`http://localhost:3000/task?userid=${id}`)
    return data
    },
    updateTaskUser:async(id,payload)=>{
      let data=axios.put(`http://localhost:3000/task/${id}`,payload)
    },
    deleteTaskUser:async(id)=>{
       let data= axios.delete(`http://localhost:3000/task/${id}`)
    // console.log(data)
    return data
    }
 }
