import axios from "axios";

const storedUserData = JSON.parse(localStorage.getItem("isLogin"));
let _id = storedUserData ? storedUserData.userId : "";
let token = storedUserData ? storedUserData.token : "";

const axiosClient = axios.create({
  baseURL: `http://localhost:8000/`,
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
