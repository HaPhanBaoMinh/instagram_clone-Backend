const express = require("express");
const { sendMessageController, getMessagesController, getChatListController } = require("../controllers/chatController");
const chatRouter = express.Router();

chatRouter.post("/", sendMessageController);
chatRouter.get("/:sender_id", getChatListController);
chatRouter.post("/message", getMessagesController);

module.exports = chatRouter 