const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
   
    const token=req.headers['auth'];
    const email=req.headers['email']
    const isAuthEmail=jwt.verify(token,"mysecret")
  console.log(email,)
    if(isAuthEmail===email)
       {next();
             
       }
    
   else{ return  res.send({
        status:400,
        message:"unAuthorised access"
    })}
}

module.exports=auth;