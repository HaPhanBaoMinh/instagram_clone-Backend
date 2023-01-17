const express = require("express");
const { createCommentController, getCommentsController, getReplyCommentsController } = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter.post("/", createCommentController);
commentRouter.get("/:post_id", getCommentsController);
commentRouter.get("/reply/:comment_id", getReplyCommentsController);

module.exports = commentRouter 