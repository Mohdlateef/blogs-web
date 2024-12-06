import { useState } from "react";
import userContext from "./userIdContext";

const UserProvider = (props: any) => {
  const storedUserData = JSON.parse(localStorage.getItem("isLogin"));
  let userId=storedUserData?storedUserData:""
const [isVisible,setIsVisible]=useState<any>(false)
const [message,setMessage]=useState<any>("")

  return (
    <userContext.Provider value={{ message, userId,isVisible,setIsVisible,setMessage}}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
