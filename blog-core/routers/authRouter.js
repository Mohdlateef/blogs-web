const express = require("express");

const auth = require("../middlewares/authMiddleware");
const {
  registerController,
  loginControler,
  logoutController,
  logOutAllController,
} = require("../controllers/authControllers");

const authRouter = express.Router();

authRouter
  .post("/sign-up", registerController)
  .post("/sign-in", loginControler)
  .post("/logout", auth, logoutController)
  .post("/logoutAll", auth, logOutAllController);

module.exports = authRouter;
