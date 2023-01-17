const express = require("express");
const { getFeedController } = require("../controllers/feedController");
const feedRouter = express.Router();

feedRouter.get("/:user_id", getFeedController);

module.exports = feedRouter 