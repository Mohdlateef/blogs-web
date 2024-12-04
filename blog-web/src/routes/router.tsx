import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home/home";

import MainLayout from "../layouts/MainLayout";
import { SingUp } from "../views/Auth/SignUp";
import SignIn from "../views/Auth/SignIn";
import { MyBlogs } from "../views/SideBar/MyBlogs/MyBlogs";
import GetProfile from "../views/SideBar/Profile/GetProfile";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element:<GetProfile/>
      },
      {
        path: "/myBlogs",
        element: <MyBlogs />
      },
    ],
  },
  {
    // Authantication
    path:'/signUp',
    element:<SingUp/>
  },
  {
    path:'/signIn',
    element:<SignIn/>
  }
]);
export default router;
