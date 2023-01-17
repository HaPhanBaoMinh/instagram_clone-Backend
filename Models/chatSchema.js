const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
    },
    recipient_id: {
        type: Schema.Types.ObjectId,
    },
    message: {
        type: String,
    },
    converstation_id: {
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const chatData = myDB.model("chat", chatSchema);

module.exports = chatData