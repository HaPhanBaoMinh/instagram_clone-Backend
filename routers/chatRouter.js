const express = require("express");
const { sendMessageController, getMessagesController, getChatListController, checkIsHaveNewMessageController } = require("../controllers/chatController");
const { authentication } = require("../middleware/authentication");
const chatRouter = express.Router();

chatRouter.post("/", authentication, sendMessageController);
chatRouter.get("/:sender_id", authentication, getChatListController);
chatRouter.post("/message", authentication, getMessagesController);
chatRouter.get("/notification/:sender_id", authentication, checkIsHaveNewMessageController);

module.exports = chatRouter 