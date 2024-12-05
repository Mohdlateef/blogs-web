import { API } from "..";

const readBlogs = async (page: any) => {
  try {
    const res = await API.get(`/blog/read-blogs?SKIP=${page}`, {
      headers:null,
      params:null,
    });
    return res.data.status === 200 ? res.data.data : "";
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (blogTitle: any, blogInput: any,) => {
  if (!blogInput) {
    alert("please enter text");
    return;
  }

  try {
    const res = await API.post(`/blog/create-blog`,
       {
      title: blogTitle,
      textbody: blogInput,
  
    });
    console.log(res)
  } catch (error) {
    console.log(error);
  }
};

export default {
  readBlogs,
  createBlog,
};
