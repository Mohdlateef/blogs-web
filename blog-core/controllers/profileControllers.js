const { getProfileModel } = require("../models/profileModel");
const ObjectId=require("mongodb").ObjectId;
const getProfile = async (req, res) => {
  // return res.send("from profile")
 
  const { userId } =req.query;
  console.log(userId,"7");
  const _id=new ObjectId(userId)
  console.log(_id,9)
  try {
    const userData = await getProfileModel(_id);
console.log(userData);
    return res.send({
      status: 200,
      data: userData,
    });
  } catch (error) {
    return res.send({
      status: 400,
      messaage: "internal server error",
    });
  }
};

module.exports = { getProfile };
