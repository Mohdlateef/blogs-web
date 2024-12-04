const express=require("express");

const auth=require("../middlewares/authMiddleware")
const { registerController, loginControler, logoutController, loginpageController, logOutAllController } = require("../controllers/authControllers");


const authRouter=express.Router();

authRouter
.post("/register",registerController)
.post("/login",loginControler)
.post("/logout",auth,logoutController)
.post("/logoutAll",auth,logOutAllController);

module.exports=authRouter;