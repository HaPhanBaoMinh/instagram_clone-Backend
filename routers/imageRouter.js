const express = require("express");
const { getImageController } = require("../controllers/imageController");
const imageRouter = express.Router();

imageRouter.get("/:filename", getImageController);

module.exports = imageRouter 