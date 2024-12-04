import axios from "axios"

const baseURL = "http://localhost:8000";

const getprofile=async()=>{
console.log("from api")
const _id:any=localStorage.getItem("userId");
console.log(_id);
    const res=await axios.get(`${baseURL}/profile/getProfile`,{
        params:{
            userId:_id
        }
    })
    console.log(res);
    if(res.data.status===200)
    {
        return res.data.data;
    }

    else
    {
        alert("internal server error")
    }
}






export default{
    getprofile,
}