const express=require("express");
require("dotenv").config();
const session=require("express-session");
const mongodbsession=require("connect-mongodb-session")(session);
const ejs=require("ejs")
const clc=require("cli-color");
const cors = require('cors');

const app=express();
app.set("view engine" ,"ejs")
// globalmiddlewarea
app.use(cors(
{     origin: 'http://localhost:5173', // You can specify the origin here
   methods:["POST","GET"],
   credentials: true,
  
}
));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// sessionconnection
const store=new mongodbsession({
    uri:process.env.MONGO_URI,
    collection:"sessions"
});
app.use(session({
    secret:process.env.SECRET,
    store:store,
    resave:false,
    saveUninitialized:false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 } 
}))

// constants
const PORT=process.env.PORT 

// fileImports
const auth=require("./middlewares/authMiddleware")
const dbConnection=require("./dbConection");
const authRouter = require("./routers/authRouter");
const blogRouter = require("./routers/blogRouter");
const followRouter = require("./routers/followrouter");
const profileRouter = require("./routers/profileRouter");


app.use("/auth",authRouter)
app.use("/blog",blogRouter)
app.use("/follow",auth,followRouter)
app.use("/profile",profileRouter)


app.get("/home", (req,res)=>{
    console.log("we are comming here",11)
   return res.json({
    status:400,
    message:'test '
   })
})
app.listen(PORT,()=>{
    console.log(clc.yellowBright.bold(`server is running on PORT${PORT}`))
})