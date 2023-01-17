const { ObjectId } = require("mongodb");
const commentSchema = require("../Models/commentSchema");
const postSchema = require("../Models/postSchema");

const createCommentsService = async ({ user_id, post_id, comment, rep_comment_id }) => {
    try {
        const newComment = commentSchema({ user_id, post_id, comment, rep_comment_id });
        const insert = await newComment.save();
        await postSchema.findOneAndUpdate(
            { _id: post_id },
            { "$inc": { "total_comments": 1 } }
        )

        if (rep_comment_id) {
            await commentSchema.findOneAndUpdate(
                { _id: rep_comment_id },
                { "$inc": { "total_rep_comment": 1 } }
            )
        }
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getCommentService = async (post_id) => {

    try {
        if (post_id == undefined || post_id.length === 0) return;
        const result = await commentSchema.aggregate([
            {
                "$match": {
                    "post_id": ObjectId(post_id),
                    "rep_comment_id": ""
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
        ])
        // sort({ created_at: -1 });
        return { status: true, result }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getReplyCommentService = async (comment_id) => {
    try {
        const result = await commentSchema.aggregate([
            {
                "$match": {
                    "rep_comment_id": comment_id
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
        ])
        return { status: true, result }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { createCommentsService, getCommentService, getReplyCommentService }