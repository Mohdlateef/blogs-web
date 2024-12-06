const express=require("express");
const { getProfile } = require("../controllers/profileControllers");


const profileRouter=express.Router();


profileRouter.get("/get-profile",getProfile)


module.exports=profileRouter;