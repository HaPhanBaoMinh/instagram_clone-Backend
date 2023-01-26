const express = require("express");
const { getNotificationController, seenNotificationController } = require("../controllers/notificationController");
const notificationRouter = express.Router();

notificationRouter.get("/:user_id", getNotificationController);
notificationRouter.get("/seen/:user_id", seenNotificationController);

module.exports = notificationRouter 