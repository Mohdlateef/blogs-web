const userValidation = ({ username, email, password }) => {
    
  return new Promise((resolve, reject) => {
    if (!username || !email || !password) {
      reject("missing cradential");
    } else if (typeof email != "string") {
      reject("email shoud be string format");
    } else if (typeof username != "string") {
      reject("username shoud be string format");
    } else if (typeof password != "string") {
      reject("password shoud be string format");
    }
    resolve();
  });
};

module.exports={userValidation};