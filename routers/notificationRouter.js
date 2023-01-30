const express = require("express");
const { getNotificationController, seenNotificationController } = require("../controllers/notificationController");
const { authentication } = require("../middleware/authentication");
const notificationRouter = express.Router();

notificationRouter.get("/:user_id", authentication, getNotificationController);
notificationRouter.get("/seen/:user_id", authentication, seenNotificationController);

module.exports = notificationRouter 