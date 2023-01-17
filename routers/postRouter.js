const express = require("express");
const { createPostController } = require("../controllers/postController");
const upload = require("../config/update");

const postRouter = express.Router();

postRouter.post("/", upload.array("images", 5), createPostController);

module.exports = postRouter 