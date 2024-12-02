import axios from "axios";

const baseURL = "http://localhost:8000";

const readBlogs = async (page: any) => {
  // console.log(page);
  try {
    const res = await axios.get(`${baseURL}/blog/readblogs?SKIP=${page}`, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data.status === 200 ? res.data.data : [];
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (blogTitle: any, blogInput: any, userId: any) => {
    console.log(blogTitle, blogInput, userId);
  if (!blogInput) {
    alert("please enter text");
    return;
  }
  axios.defaults.withCredentails = true;
  // console.log("from createBlog",userId)

  try {
    const res = await axios.post(
      `${baseURL}/blog/createblog`,
      {
        title: blogTitle,
        textbody: blogInput,
        userId: userId,
      },
      {
        headers: {
          auth: JSON.parse(localStorage.getItem("isLogin")).token,
          email: "test5@gmail.com ",
        },
      }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default {
  readBlogs,
  createBlog,
};
