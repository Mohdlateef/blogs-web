import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
// import { logout } from '../../apiServices/auth/authApi';
import{logout} from '../../views/SideBar/Logout/logout';

export default function Sidebar() {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col justify-evenly w-1/6 max-h-[90vh] bg-blue-600 text-white p-4 ">
      <NavLink to="/" className="px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-center" >
        Home
      </NavLink>
      <NavLink to="/profile" className="px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-center" >
        Profile
      </NavLink>
      <NavLink to="/myBlogs" className="px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-center" >
        My-Blogs
      </NavLink>
     
      <button className="px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200" onClick={()=>
        {
        
          logout();
          navigate("/signIn")
        }
      }>
        Logout
      </button>
     
    </div>
  );
}
