const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
// fileExports
const { registerUser, findUserWithKey } = require("../models/userModel");
const { userValidation } = require("../utils/authUtils");

const registerController = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    //datavalidation
    await userValidation({ username, email, password });

    // registeruser
    await registerUser({ name, username, email, password });
    return res.send({
      status: 201,
      message: "user register sucessfully",
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "server error",
      error: error,
    });
  }
};
const loginpageController = (req, res) => {
  return res.render("login");
};

const loginControler = async (req, res) => {
  const { loginId, password } = req.body;

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
    // const userId=ObjectId.toString(userDb._id)
    const token = jwt.sign(loginId, "mysecret");

    // create_session
    req.session.isAuth = true;

    req.session.User = {
      userId: userDb._id,
      username: userDb.username,
      email: userDb.email,
    };
    res.send({
      status: 200,
      message: "login sucessfully",
      data: { userDb },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: "backend error",
      error: error,
    });
  }
};

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

const logOutAllController = async (req, res) => {
  const userId = req.session.User.userId;

  //create a session schema
  const sessionSchema = new Schema({ _id: String }, { strict: false });
  // conver it into a model
  const sessionModel = mongoose.model("session", sessionSchema);

  // perform mongoose query to delete the entry
  console.log(userId, 104);
  try {
    const deleteDb = await sessionModel.deleteMany({
      "session.User.userId": userId,
    });
    console.log(deleteDb);
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
  loginpageController,
  loginControler,
  logoutController,
  logOutAllController,
};
