const express = require("express");
const { sendMessageController, getMessagesController, getChatListController, checkIsHaveNewMessageController } = require("../controllers/chatController");
const chatRouter = express.Router();

chatRouter.post("/", sendMessageController);
chatRouter.get("/:sender_id", getChatListController);
chatRouter.post("/message", getMessagesController);
chatRouter.get("/notification/:sender_id", checkIsHaveNewMessageController);

module.exports = chatRouter 