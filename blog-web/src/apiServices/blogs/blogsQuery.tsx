import { keepPreviousData, useMutation, useQuery,useQueryClient } from "@tanstack/react-query"
import { BlogsAPI } from ".."
import blogsAPI from "./blogsAPI";
// import { data } from "react-router-dom";





const useQueryreadBlogs=(pageNumber:Number)=>{
    return useQuery({
        queryKey:["blogs",pageNumber],
        queryFn:()=>BlogsAPI.readBlogs(pageNumber),
        placeholderData:keepPreviousData,
    });
}




const useMutationCreateBlog=(blogTitle:String,blogInput:string,_id:any,pageNumber:number)=>{
  const queryClient=useQueryClient();

    return useMutation({
        mutationFn:()=>BlogsAPI.createBlog(blogTitle,blogInput,_id),
        onSuccess:(data:any)=>{
            queryClient.invalidateQueries('blogs');
              
           
        }
    
      
    })
}

export default{
    useQueryreadBlogs,
    useMutationCreateBlog
}



