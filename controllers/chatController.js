const { sendMessageService, getMessageService, getChatListService, checkIsHaveNewMessageService } = require("../services/chatService");

const sendMessageController = async (req, res) => {
    try {
        const body = req.body;
        const result = await sendMessageService(body);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const getMessagesController = async (req, res) => {
    try {
        const messageInfo = await req.body;
        const result = await getMessageService(messageInfo);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getChatListController = async (req, res) => {
    try {
        const sender_id = await req.params.sender_id;
        const result = await getChatListService({ sender_id });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const checkIsHaveNewMessageController = async (req, res) => {
    try {
        const sender_id = await req.params.sender_id;
        const result = await checkIsHaveNewMessageService(sender_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

module.exports = { sendMessageController, getMessagesController, getChatListController, checkIsHaveNewMessageController }