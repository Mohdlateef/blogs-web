import { API } from "..";

const readBlogs = async (page: number) => {
  try {
    const res = await API.get(`/blog/read-blogs?SKIP=${page}`, {
      headers: null,
      params: null,
    });
    return res.data.status === 200 ? res.data.data : "";
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (blogTitle: string, blogInput: string) => {
  if (!blogInput) {
    alert("please enter a blog post");
    return;
  }
  if (!blogTitle) {
    alert("please enter a blog Title");
    return;
  }
  try {
    const res = await API.post(`/blog/create-blog`, {
      title: blogTitle,
      textbody: blogInput,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default {
  readBlogs,
  createBlog,
};
