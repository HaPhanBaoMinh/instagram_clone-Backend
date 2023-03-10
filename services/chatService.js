const userSchema = require("../Models/userSchema");
const chatSchema = require("../Models/chatSchema");
const { ObjectId } = require("mongodb");
const conversationSchema = require("../Models/conversationSchema");

const sendMessageService = async ({ sender_id, recipient_id, message }) => {
    try {
        const isExistSender = await userSchema.countDocuments({ _id: sender_id });
        const isExistRecipient = await userSchema.countDocuments({ _id: recipient_id });
        let converstation = await conversationSchema.findOne({ sender_id, recipient_id });

        if (!converstation) {
            newConverstation_user1 = await conversationSchema({ sender_id, recipient_id });
            newConverstation_user2 = await conversationSchema({ sender_id: recipient_id, recipient_id: sender_id });
            converstation_1 = await newConverstation_user1.save();
            converstation_2 = await newConverstation_user2.save();
        }

        if (!isExistRecipient || !isExistSender) return { status: true, message: "Wrong id!" };
        await conversationSchema.findOneAndUpdate({ sender_id: recipient_id, recipient_id: sender_id }, { newMessage: true });

        const newMessage = chatSchema({ sender_id, recipient_id, message });
        const insert = await newMessage.save();
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const getMessageService = async ({ sender_id, recipient_id }) => {
    try {
        const isExistSender = await userSchema.countDocuments({ _id: sender_id });
        const isExistRecipient = await userSchema.countDocuments({ _id: recipient_id });

        if (!isExistRecipient || !isExistSender) return { status: true, message: "Wrong id!" };

        await conversationSchema.findOneAndUpdate({ sender_id, recipient_id }, { newMessage: false });
        // console.log({ sender_id, recipient_id });

        const message = await chatSchema.find({
            $or: [
                { sender_id: sender_id, recipient_id: recipient_id },
                { sender_id: recipient_id, recipient_id: sender_id },
            ]
        });

        return {
            status: true,
            message
        }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const getChatListService = async ({ sender_id }) => {
    try {
        const result = await conversationSchema.aggregate([
            {
                "$match": {
                    "sender_id": ObjectId(sender_id),
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "recipient_id",
                    "pipeline": [
                        {
                            "$project": { "name": 1, "username": 1, "avatar": 1 }
                        }
                    ],
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            { "$unwind": '$user' },
            // {
            //     "$project": { "user": 1 }
            // }
        ])
        return { status: true, result }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const checkIsHaveNewMessageService = async (sender_id) => {
    try {
        const result = await conversationSchema.find({ sender_id });
        return {
            status: true,
            result
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { sendMessageService, getMessageService, getChatListService, checkIsHaveNewMessageService }