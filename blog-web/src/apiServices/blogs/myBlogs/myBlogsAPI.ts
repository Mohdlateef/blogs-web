import axios from "axios";

const baseURL = "http://localhost:8000";

const myblogs = async (userId: string, page: Number) => {
  console.log("test");

  const params: any = {
    userId: userId,
  };
  const res = await axios.get(
    `http://localhost:8000/blog/read-my-blogs?SKIP=${page}`,
    { params }
  );

  if (res.data.status === 200) {
    return res.data.data;
  }
  if (res.data.status === 204) {
    return res.data.message;
  }
};

const deleteMyBlog = async (id: string) => {
  try {
    const res = await axios.post(`${baseURL}/blog/delete-blog`, {
      blogId: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (text: string, blogId: string) => {
  const res = await axios.post(`${baseURL}/blog/edit-blog`, {
    newText: text,
    blogId,
  });
  return res.data;
};

export default {
  myblogs,
  deleteMyBlog,
  updateBlog,
};
