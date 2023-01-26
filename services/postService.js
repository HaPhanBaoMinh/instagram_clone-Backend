const { ObjectId } = require("mongodb");
const commentsData = require("../Models/commentSchema");
const likesData = require("../Models/likeSchema");
const postSchema = require("../Models/postSchema");
const userData = require("../Models/userSchema");

const createPostService = async ({ user_id, caption, images }) => {
    try {
        const newPost = postSchema({ user_id, caption, images });
        const insert = await newPost.save();
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getTrendingPostService = async () => {
    try {
        const result = await postSchema.aggregate([
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
            {
                "$sort": {
                    total_likes: -1
                }
            },
            { "$limit": 5 }
        ])
        return { status: true, result }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getPostByIdService = async (post_id) => {
    try {
        const result = await postSchema.aggregate([
            {
                "$match": {
                    "_id": ObjectId(post_id)
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
            { "$unwind": '$user' },
            { "$limit": 1 }
        ])

        return { status: true, result: result[0] }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const likeNotificationService = async (post_id, user_id) => {
    try {
        const result = await likesData.aggregate([
            {
                "$match": {
                    "post_id": ObjectId(post_id),
                    "user_id": ObjectId(user_id)
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
                    "as": "action_userInfo"
                }
            },
            { "$unwind": '$action_userInfo' },
            {
                "$lookup": {
                    "from": "posts",
                    "localField": "post_id",
                    "pipeline": [
                        {
                            "$project": { "images": 1, "user_id": 1 }
                        }
                    ],
                    "foreignField": "_id",
                    "as": "postInfo"
                }
            },
            { "$unwind": '$postInfo' },
            {
                "$project": { "postInfo": 1, "action_userInfo": 1, "seen": 1 }
            }
        ])
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const commentNotificationService = async (post_id, user_id) => {
    try {
        const result = await commentsData.aggregate([
            {
                "$match": {
                    "post_id": ObjectId(post_id),
                    "user_id": ObjectId(user_id)
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
                    "as": "action_userInfo"
                }
            },
            { "$unwind": '$action_userInfo' },
            {
                "$lookup": {
                    "from": "posts",
                    "localField": "post_id",
                    "pipeline": [
                        {
                            "$project": { "images": 1, "user_id": 1 }
                        }
                    ],
                    "foreignField": "_id",
                    "as": "postInfo"
                }
            },
            { "$unwind": '$postInfo' },
            {
                "$project": { "postInfo": 1, "action_userInfo": 1, "seen": 1 }
            }
        ])
        return result[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createPostService, getTrendingPostService, getPostByIdService, likeNotificationService, commentNotificationService }