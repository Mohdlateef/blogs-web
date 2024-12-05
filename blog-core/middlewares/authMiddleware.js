const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["token"];
  const _id = req.headers["_id"];
  const isAuth = jwt.verify(token, "mysecret");
  console.log(isAuth)
  if (isAuth === _id) next();
  else {
    return res.send({
      status: 400,
      message: "unAuthorised access",
    });
  }
};

module.exports = auth;
