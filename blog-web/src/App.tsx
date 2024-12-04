

// import './App.css'
import React from "react"
import { RouterProvider } from "react-router-dom"
import router from "./routes/router"
// import SignIn from "./views/Utils/SignIn"

const App:React.FC=()=>
<RouterProvider router={router}/>



export default App
