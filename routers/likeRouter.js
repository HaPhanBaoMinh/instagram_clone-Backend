const express = require("express");
const { createLikeController, deleteLikeController, checkIsLikePostController } = require("../controllers/likeController");
const { authentication } = require("../middleware/authentication");
const likeRouter = express.Router();

likeRouter.post("/", authentication, createLikeController);
likeRouter.post("/remove", authentication, deleteLikeController);
likeRouter.post("/check-like", authentication, checkIsLikePostController);
// likeRouter.get("/:post_id", getCommentsController);

module.exports = likeRouter 