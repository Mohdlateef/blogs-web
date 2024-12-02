import React ,{useEffect}from "react";
import Navbar from "./fragments/navbar";
import Sidebar from "./fragments/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
export default function MainLayout() {
//
const navigate=useNavigate();
  // check isuser login or not
  const loginDetails:any=JSON.parse(localStorage.getItem("isLogin"))

  let islogin:any=false;
 if(loginDetails)
 {
  islogin=loginDetails.islogin;
 }

 useEffect(() => {
  // If user is not logged in, redirect to sign-in page
  if (!islogin) {
    navigate('/signIn');


  }
},  [islogin]);
return (
islogin?
      <div className="flex flex-col overflow-hidden h-[100vh] ">
        <Navbar />
        <div className="flex  h-[90vh]">
          <Sidebar />
          <Outlet />
        </div>
      </div>
  :""
     

  
  );
}
