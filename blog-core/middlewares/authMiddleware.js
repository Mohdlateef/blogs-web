const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["token"];
  const _id = req.headers["_id"];
  console.log(_id)
  console.log(token, 6);
  // const isAuth = jwt.verify(token, "mysecret");
  if (token) next();
  else {
    return res.send({
      status: 400,
      message: "unAuthorised access",
    });
  }
};

module.exports = auth;
