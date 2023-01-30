const express = require("express");
const { createCommentController, getCommentsController, getReplyCommentsController } = require("../controllers/commentController");
const { authentication } = require("../middleware/authentication");
const commentRouter = express.Router();

commentRouter.post("/", authentication, createCommentController);
commentRouter.get("/:post_id", authentication, getCommentsController);
commentRouter.get("/reply/:comment_id", authentication, getReplyCommentsController);

module.exports = commentRouter 