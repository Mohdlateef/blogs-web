import axios from "axios"

const baseURL = "http://localhost:8000";

const getprofile=async()=>{
const _id:any=localStorage.getItem("userId");
console.log(_id);
    const res=await axios.get(`${baseURL}/profile/get-profile`,{
        params:{
            userId:_id
        }
    })
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