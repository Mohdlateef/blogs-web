const cli = require("cli-color");
const bcrypt = require("bcrypt");
const ObjectId=require("mongodb").ObjectId;
// file imports
const userSchema = require("../schemas/userSchema");

const registerUser = ({ name, username, email, password }) => {
  return new Promise(async (resolve, reject) => {
    // db to check weather username and email already exist or not
    const userExist = await userSchema.findOne({
      $or: [{ email }, { username }],
    });
    console.log(cli.bgBlue(userExist));
    if (userExist && userExist.email === email) reject("Email alreday exist");

    if (userExist && userExist.username === username) {
      reject("username already exist");
    }

    //encrypt_password
    const hashpassword = await bcrypt.hash(password, Number(process.env.SALT));
    //store userdata in Db
    try {
      const userObj = new userSchema({
        name,
        username,
        email,
        password: hashpassword,
      });
      await userObj.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};


//login_user
const findUserWithKey=({key})=>{
console.log(key,41)
    return new Promise(async(resolve,reject)=>{
        try {
          if(!key){
            reject("key is missing")
          }
            const userData=await userSchema.findOne({
                $or:[ObjectId.isValid(key)?{_id:key}:{username:key},{email:key}]

            });
          
            
            if(!userData) reject("user not found");

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })

}

module.exports = { registerUser ,findUserWithKey};
