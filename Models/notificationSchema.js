const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
    },
    post_id: ObjectID,
    action_userId: ObjectID,
    seen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "like your post"
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const notificationData = myDB.model("notification", notificationSchema);

module.exports = notificationData