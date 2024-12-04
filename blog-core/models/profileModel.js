const userSchema = require("../schemas/userSchema");

const getProfileModel = ( _id ) => {
  // console.log(_id,"4");
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await userSchema.findOne(_id);
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};



module.exports={getProfileModel}