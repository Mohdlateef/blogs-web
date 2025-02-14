const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const { registerUser, findUserWithKey } = require("../models/userModel");
const { userValidation, userDataValiDation } = require("../utils/authUtils");

const registerController = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    await userValidation({ username, email, password });
  } catch (error) {
    return res.send({
      status: 400,
      error: error,
    });
  }
  try {
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
    const userDb = await findUserWithKey({ key: loginId });

    const ismatch = await bcrypt.compare(password, userDb.password);

    if (!ismatch) {
      return res.send({
        status: 400,
        message: "incrorect password",
      });
    }

    const token = jwt.sign(_id, "mysecret");
    console.log(token,59)
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
const logoutController = async (req, res) => {
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
