const postSchema = require("../Models/postSchema");

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

module.exports = { createPostService }