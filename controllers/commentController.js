const { createCommentsService, getCommentService, getReplyCommentService } = require("../services/commentsService");

const createCommentController = async (req, res) => {
    try {
        const body = req.body;
        const result = await createCommentsService(body);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const getCommentsController = async (req, res) => {
    try {
        const postId = await req.params.post_id;
        const result = await getCommentService(postId);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getReplyCommentsController = async (req, res) => {
    try {
        const commentId = await req.params.comment_id;
        const result = await getReplyCommentService(commentId);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

module.exports = { createCommentController, getCommentsController, getReplyCommentsController }