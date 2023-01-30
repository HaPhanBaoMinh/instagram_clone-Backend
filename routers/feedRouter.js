const express = require("express");
const { getFeedController } = require("../controllers/feedController");
const { authentication } = require("../middleware/authentication");
const feedRouter = express.Router();

feedRouter.get("/:user_id", authentication, getFeedController);

module.exports = feedRouter 