import axios from "axios";
const storedUserDataString = localStorage.getItem("isLogin") ?? "null"; // fallback to "null" if it's null
const storedUserData = storedUserDataString !== "null" ? JSON.parse(storedUserDataString) : null;


const _id = storedUserData ? storedUserData.userId : "";
const token = storedUserData ? storedUserData.token : "";
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`,
  params: {
    userId: _id,
  },
  headers: {
    _id,
    token,
  },
});
export const API = axiosClient;

import myBlogsAPI from "./blogs/myBlogs/myBlogsAPI";
import profileAPI from "./profile/profileAPI";
import blogsAPI from "./blogs/blogsAPI";

import myBlogsQuery from "./blogs/myBlogs/myBlogsQuery";
import blogsQuery from "./blogs/blogsQuery";
import profileQurey from "./profile/profileQurey";

export const MyBlogsAPI = myBlogsAPI;
export const ProfileAPI = profileAPI;
export const BlogsAPI = blogsAPI;

export const MyBlogsQuery = myBlogsQuery;
export const BlogsQuery = blogsQuery;
export const ProfileQuery = profileQurey;
