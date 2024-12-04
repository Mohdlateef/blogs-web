const { LIMIT } = require("../privateContants");
const blogSchema = require("../schemas/blogSchema");

const createBlogModel = ({ title, textbody, userId }) => {
  return new Promise(async (resolve, reject) => {
    const blogdb = new blogSchema({
      title,
      textbody,
      creationDateTime: Date.now(),
      userId: userId,
    });
    try {
      await blogdb.save();
      resolve(blogdb);
    } catch (error) {
      reject(error);
    }
  });
};

//readAllBLogs
const readBlogsModel = ({ SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogs = await blogSchema.aggregate([
        {
          $sort: { creationDateTime: -1 }, //-1 Assending,1 desending,
        },
        {
          $skip: SKIP,
        },
        { $limit: LIMIT },
      ]);

      resolve(blogs);
    } catch (error) {
      reject(error);
    }
  });
};

//read my blogs

const readMyBlogsModel = ({ SKIP, userId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const myblogs = await blogSchema.aggregate([
        { $match: { userId } },
        { $sort: { creationDateTime: -1 } },
        { $skip: SKIP },
        { $limit: LIMIT },
      ]);
        // console.log(myblogs,53);
      resolve(myblogs);
    } catch (error) {
      reject(error);
    }
  });
};

const getBlogWithId = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blogdata = await blogSchema.findOne({ _id: blogId });
      resolve(blogdata);
    } catch (error) {
      reject(error);
    }
  });
};

const editBlog = ({ newTitle, newText, blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await blogSchema.findOneAndUpdate(
        { _id: blogId },
        {  textbody: newText }
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const deleteBlog = ({blogId}) => {
    console.log(87,blogId);
  return new Promise(async (resolve, reject) => {
    try {
    const deletedb=  await blogSchema.findOneAndDelete({ _id:blogId});
      resolve(deletedb);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createBlogModel,
  readBlogsModel,
  readMyBlogsModel,
  getBlogWithId,
  editBlog,
  deleteBlog,
};
