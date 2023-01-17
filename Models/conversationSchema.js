const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
    },
    recipient_id: {
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const conversationData = myDB.model("conversation", conversationSchema);

module.exports = conversationData