import { createBrowserRouter } from "react-router-dom"
import Register from "../user/Register"
import PrivateRoute from "../helper/PrivateRoute"
import Login from "../Login"
import Creation from "../task/Creation"
import GetTask from "../task/GetTask"
import UpdateTask from "../task/UpdateTask"
export let routes=createBrowserRouter([
    {
        path:"/",
        element:<Login></Login>
    },
    {
        path:"/Register",
        element:<Register></Register>
    },
    {
     path:"/Creation",
    element:<PrivateRoute><Creation></Creation></PrivateRoute>
    },
    {
        path:"/getTask",
        element:<PrivateRoute><GetTask></GetTask></PrivateRoute>
    },
    {
        path:"/updateTask",
        element:<PrivateRoute><UpdateTask></UpdateTask></PrivateRoute>
    },
])