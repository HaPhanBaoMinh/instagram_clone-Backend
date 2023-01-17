const { default: mongoose } = require("mongoose");
const userFollowerSchema = require("../Models/user_followers");
const postSchema = require("../Models/postSchema");
const { ObjectId } = require("mongodb");

const getFeedsService = async (user_id) => {
    try {
        // Tìm những người mình là follower
        const followingUserObject = await userFollowerSchema.find({ user_id }).select("follower_id");
        // const followingUserId = followingUserObject.map(user => user.user_id.toString());
        const followingUserId = followingUserObject.map(user => ObjectId(user.follower_id));
        const postInfo = await postSchema.aggregate([
            {
                "$match": {
                    "user_id": {
                        "$in": followingUserId
                    }
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "user_id",
                    "pipeline": [
                        {
                            "$project": { "name": 1, "username": 1, "avatar": 1 }
                        }
                    ],
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            {
                "$sort": {
                    "created_at": -1
                }
            },
            { "$unwind": '$user' },
        ])

        // console.log(followingUserId);
        // console.log(followingUserObject);
        return { status: true, postInfo }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { getFeedsService }