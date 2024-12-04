import { useNavigate } from "react-router-dom";


export const logout=()=>{
 const iteams:any=["userId","isLogin"];



    // localStorage.removeItem("userId","Islogin")
//remove iteams from local storage
iteams.forEach((key:any)=>{
    localStorage.removeItem(key);
})
return 

}

