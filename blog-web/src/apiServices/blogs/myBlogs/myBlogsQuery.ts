import { keepPreviousData ,useMutation, useQueryClient ,useQuery} from "@tanstack/react-query";
import { useContext ,useState} from "react";
// import userContext from "../../../globalvaribles/context/userIdContext";
import userContext from "../../../context/userIdContext";
import { MyBlogsAPI, MyBlogsQuery } from "../..";




type Data = {
  data: any;
  isPending: boolean;
 
};





const useQueryGetMyBlogs=(pageNumber:Number)=>{
const userData:any=useContext(userContext)
const userId:string=userData.userId

return useQuery({
  queryKey:["myBlogs",pageNumber],
  queryFn: () => MyBlogsAPI.myblogs(userId,pageNumber),
  placeholderData:keepPreviousData
})}









const useMutationDeleteMyBlog=(pageNumber:Number)=>{
  const queryClient=useQueryClient();

  return useMutation({
    mutationFn:(id:string)=>MyBlogsAPI.deleteMyBlog(id),
    onSuccess:(data:any,id:string)=>{
      queryClient.setQueryData(["myBlogs",pageNumber],(oldMyBlogs:any)=>{
        const newMyBlogs:any=oldMyBlogs?.filter((blog:any)=>blog._id!==id)
        // console.log(newMyBlogs)
        return newMyBlogs
      })
    }
  })
}
    


const useMutationUpdateMyBlog=(text:string)=>{
  const queryClient=useQueryClient();
  
  return useMutation({
    mutationFn:(id:string)=>MyBlogsAPI.updateBlog(text,id),
    onsuccess:(data:any,id:string)=>{
console.log(data);
    }
  })
}

export default{
  useQueryGetMyBlogs,
  useMutationDeleteMyBlog,
  useMutationUpdateMyBlog,
}

