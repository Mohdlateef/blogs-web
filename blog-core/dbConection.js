const mongoose=require("mongoose")
const clc=require("cli-color")
const MONGO_URI=process.env.MONGO_URI




mongoose.connect(MONGO_URI).then(()=>{
    console.log(clc.bgGreen.blackBright.bold("DataBase connected sucessfully"))

}).catch((error)=>{
    console.log(clc.red(error));
})

