const ObjectId = require("mongodb").ObjectId;
const {
  createBlogModel,
  readBlogsModel,
  readMyBlogsModel,
  getBlogWithId,
  editBlog,
  deleteBlog,
} = require("../models/blogModel");
const { LIMIT } = require("../privateContants");

const blogDataValidation = require("../utils/blogutils");

const createBlogControler = async (req, res) => {
  const { title, textbody } = req.body;
  const userId = req.headers["_id"];
  try {
    await blogDataValidation(title, textbody);
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }

  try {
    const blogdb = await createBlogModel({ title, textbody, userId });
    return res.send({
      status: 201,
      message: "blog created sucessfully ",
      data: blogdb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
      error: error,
    });
  }
};

const readBlogsController = async (req, res) => {
  const SKIP = parseInt(req.query.SKIP) || 0;
  try {
    const blogs = await readBlogsModel({ SKIP });
    if (blogs.length == 0) {
      return res.send({
        status: 204,
        message: "No Content",
      });
    }
    return res.send({
      status: 200,
      data: blogs,
      limit: LIMIT,
    });
  } catch (error) {
    return res.send({
      status: 500,
      error: error,
    });
  }
};

const readMyBlogsController = async (req, res) => {
  const SKIP = parseInt(req.query.SKIP) || 0;
  const userId = new ObjectId(req.query.userId);
  try {
    const myblogs = await readMyBlogsModel({ SKIP, userId });
    if (myblogs.length === 0) {
      return res.send({
        status: 204,
        message: "No content",
      });
    }
    return res.send({
      status: 200,
      data: myblogs,
    });
  } catch (error) {
    return res.send({
      staus: 500,
      message: "internal server error",
      error: error,
    });
  }
};

const editBlogsController = async (req, res) => {
  const { newText, blogId } = req.body;
  try {
    await blogDataValidation(newText);
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }

  try {
    const blogdata = await getBlogWithId({ blogId });
    if (!blogdata) {
      return res.send({
        status: 204,
        message: `no content find regarding ${blogId}`,
      });
    }
    await editBlog({ newText, blogId });
    return res.send({
      status: 201,
      message: "new data edited sucessfully",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
      error: error,
    });
  }
};

const deleteBlogController = async (req, res) => {
  const { blogId } = req.body;
  try {
    const blogdata = await getBlogWithId({ blogId });
    if (!blogdata) {
      return res.send({
        status: 204,
        message: `no blog found with this ${blogId}`,
      });
    }
    const deletedb = await deleteBlog({ blogId });
    return res.send({
      status: 200,
      message: "blog deleted sucessfully",
      data: deletedb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
    });
  }
};
module.exports = {
  createBlogControler,
  readBlogsController,
  readMyBlogsController,
  editBlogsController,
  deleteBlogController,
};
