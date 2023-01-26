const express = require("express");
const { createPostController, getTrendingPostController, getPostByIdController } = require("../controllers/postController");
const upload = require("../config/update");

const postRouter = express.Router();

postRouter.post("/", upload.array("images", 5), createPostController);
postRouter.get("/trending", getTrendingPostController);
postRouter.get("/:post_id", getPostByIdController);

module.exports = postRouter 