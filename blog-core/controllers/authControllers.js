const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
// fileExports
const { registerUser, findUserWithKey } = require("../models/userModel");
const { userValidation, userDataValiDation } = require("../utils/authUtils");

const registerController = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    //datavalidation
    await userValidation({ username, email, password });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }
  try {
    // registeruser
    await registerUser({ name, username, email, password });
    return res.send({
      status: 201,
      message: "user register sucessfully",
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: " internal server error",
      error: error,
    });
  }
};
const loginControler = async (req, res) => {
  const { loginId, password } = req.body;
  const _id = req.headers["_id"];

  try {
    await userDataValiDation({ loginId, password });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }
  try {
    //find user in Db
    const userDb = await findUserWithKey({ key: loginId });
    //compare password
    const ismatch = await bcrypt.compare(password, userDb.password);

    if (!ismatch) {
      return res.send({
        status: 400,
        message: "incrorect password",
      });
    }

    // genrate tokens
    const token = jwt.sign(_id, "mysecret");
    res.send({
      status: 200,
      message: "login sucessfully",
      data: { userDb },
      token: token,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
      error: error,
    });
  }
};

// todo:work in progress
//logout
const logoutController = async (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: 400,
        message: "logout unsucessfull",
        err: err,
      });
    }
    return res.send({
      status: 200,
      message: "logout sucessfully",
    });
  });
};

// todo:work in progress
const logOutAllController = async (req, res) => {
  const userId = req.session.User.userId;

  //create a session schema
  const sessionSchema = new Schema({ _id: String }, { strict: false });
  // conver it into a model
  const sessionModel = mongoose.model("session", sessionSchema);

  // perform mongoose query to delete the entry
  try {
    const deleteDb = await sessionModel.deleteMany({
      "session.User.userId": userId,
    });

    return res.send({
      status: 200,
      message: `you are logout form ${deleteDb.deletedCount} devices secussfully`,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "internal server error",
      error: error,
    });
  }
};
module.exports = {
  registerController,

  loginControler,
  logoutController,
  logOutAllController,
};
