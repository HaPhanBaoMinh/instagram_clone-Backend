const { getNotificationService, seenNotificationService } = require("../services/notificationService");

const getNotificationController = async (req, res) => {
    try {
        const user_id = await req.params.user_id;
        const result = await getNotificationService(user_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const seenNotificationController = async (req, res) => {
    try {
        const user_id = await req.params.user_id;
        const result = await seenNotificationService(user_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

module.exports = { getNotificationController, seenNotificationController }