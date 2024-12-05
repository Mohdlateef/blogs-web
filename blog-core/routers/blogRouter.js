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
.post("/create-blog",auth,createBlogControler)
.get("/read-blogs",readBlogsController)
.get("/read-my-blogs",auth,readMyBlogsController)
.post("/edit-blog",editBlogsController)
.post("/delete-blog",deleteBlogController)






module.exports=blogRouter;