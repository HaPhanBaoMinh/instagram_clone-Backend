const likeSchema = require("../Models/likeSchema");
const postSchema = require("../Models/postSchema");
const commentSchema = require("../Models/commentSchema");

const createLikeService = async ({ user_id, post_id }) => {
    try {
        console.log({ user_id, post_id });
        const newLike = likeSchema({ user_id, post_id });
        const insert = await newLike.save();
        await postSchema.findOneAndUpdate(
            { _id: post_id },
            { "$inc": { "total_likes": 1 } }
        )
        await commentSchema.findOneAndUpdate(
            { _id: post_id },
            { "$inc": { "total_likes": 1 } }
        )
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const deleteLikeService = async ({ user_id, post_id }) => {
    try {
        const insert = await likeSchema.findOneAndDelete({ user_id, post_id });
        const increase = await postSchema.findOneAndUpdate(
            { _id: post_id },
            { "$inc": { "total_likes": -1 } }
        )
        await commentSchema.findOneAndUpdate(
            { _id: post_id },
            { "$inc": { "total_likes": -1 } }
        )
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const checkIsLikePostService = async ({ user_id, post_id }) => {
    if (!user_id || !post_id) return { status: false, message: "Wrrong id!" };

    try {
        const result = await likeSchema.findOne({ user_id, post_id });
        if (result) {
            return { status: true, isLikePost: false };
        }
        return { status: true, isLikePost: true };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { createLikeService, deleteLikeService, checkIsLikePostService }