const { ObjectId } = require("mongodb");
const notificationData = require("../Models/notificationSchema");

const createNewNotificationService = async (user_id, post_id, action_userId, type) => {
    try {
        const notification = notificationData({ user_id, post_id, action_userId, type });
        const insert = await notification.save();
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getNotificationService = async (user_id) => {
    try {
        const result = await notificationData.aggregate([
            {
                "$match": {
                    "user_id": ObjectId(user_id),
                    "action_userId": {
                        "$ne": ObjectId(user_id)
                    }
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "action_userId",
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
                "$project": { "postInfo": 1, "action_userInfo": 1, "seen": 1, "type": 1 }
            }
        ])
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const seenNotificationService = async (user_id) => {
    try {
        const result = await notificationData.updateMany({ user_id }, { seen: true });
        return { status: true, result }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { createNewNotificationService, getNotificationService, seenNotificationService }