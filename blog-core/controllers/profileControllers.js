const ObjectId = require("mongodb").ObjectId;

const { getProfileModel } = require("../models/profileModel");

const getProfile = async (req, res) => {
  const { userId } = req.query;
  const _id = new ObjectId(userId);
  try {
    const userData = await getProfileModel(_id);
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
