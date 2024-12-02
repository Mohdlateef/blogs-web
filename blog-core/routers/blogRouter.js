const express=require("express");

//file imports;
const auth = require("../middlewares/authMiddleware");

const { createBlogControler,
     readBlogsController ,
     readMyBlogsController,
     editBlogsController,
     deleteBlogController
    } = require("../controllers/blogControllers");


const blogRouter=express.Router();


blogRouter
.post("/createblog",createBlogControler)
.get("/readblogs",readBlogsController)
.get("/read-my-blogs",readMyBlogsController)
.post("/editblog",editBlogsController)
.post("/deleteblog",deleteBlogController)






module.exports=blogRouter;