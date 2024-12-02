const followSchema = require("../schemas/followSchema");
const { LIMIT } = require("../privateContants");
const userSchema = require("../schemas/userSchema");

// store the follower and following in database
const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followObj = new followSchema({
        followerUserId,
        followingUserId,
      });
      await followObj.save();
      resolve(followObj);
    } catch (error) {
      reject(error);
    }
  });
};

const followingUser = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const followingList=await followSchema.find({followerUserId:followerUserId}
      // ).populate("followingUserId");
      // console.log(followingList)
      // resolve(followingList)
      const followingListDb = await followSchema.aggregate([
        { $match: { followerUserId: followerUserId } },
        { $sort: { creationDateTime: -1 } },
        { $skip: SKIP },
        { $limit: LIMIT },
      ]);
      console.log(followingListDb, 34);

      const followingUserId = followingListDb.map(
        (iteam) => iteam.followingUserId
      );
      const followingUserDetails = await userSchema.find({
        _id: { $in: followingUserId },
      });
      console.log(followingUserDetails),
        resolve(followingUserDetails.reverse());
    } catch (error) {
      reject(error);
    }
  });
};
const followerUser = ({ followingUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followerList = await followSchema.aggregate([
        { $match: { followingUserId: followingUserId } },
        { $sort: { creationDateTime: -1 } },
        { $skip: SKIP },
        { $limit: LIMIT },
      ]);
      if (followerList.length === 0) {
        reject("no data found");
      }
      const followerUserIds = followerList.map((iteam) => iteam.followerUserId);
      const followerUserDetails = await userSchema.find({
        _id: { $in: followerUserIds },
      });
      resolve(followerUserDetails.resverse());
    } catch (error) {
      reject(error);
    }
  });
};
const unFollowUser=({followerUserId,followingUserId})=>{
  return new Promise(async(reject,resolve)=>{
   try {
    const deleteDb=await followSchema.findOneAndDelete({followerUserId:followerUserId},{followingUserId:followingUserId});
    resolve(deleteDb);
  }
   catch (error) {
    reject(error);
   }})
}
module.exports = { followUser, followingUser, followerUser ,unFollowUser};
