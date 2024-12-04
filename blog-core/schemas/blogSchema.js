const mongoose=require("mongoose");

const Schema=mongoose.Schema;


const blogSchema=new Schema({
    title:{
        type:String,
        require:true,
        // unique:true,
        // trim:true,
        // minlength:3,
        // maxlength:100,
    },
    textbody:{
        type:String,
        require:true,
        // unique:true,
        // trim:true,
       
    },
    creationDateTime:{
        type:String,
        require:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        // ref:"user" //fk to user collection
    }
});
module.exports=mongoose.model("blog",blogSchema);