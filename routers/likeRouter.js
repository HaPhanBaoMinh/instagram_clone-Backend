const express = require("express");
const { createLikeController, deleteLikeController, checkIsLikePostController } = require("../controllers/likeController");
const likeRouter = express.Router();

likeRouter.post("/", createLikeController);
likeRouter.post("/remove", deleteLikeController);
likeRouter.post("/check-like", checkIsLikePostController);
// likeRouter.get("/:post_id", getCommentsController);

module.exports = likeRouter 