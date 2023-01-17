const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
    },
    total_likes: {
        type: Number,
        default: 0
    },
    post_id: ObjectID,
    comment: String,
    rep_comment_id: String,

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const commentsData = myDB.model("comments", commentSchema);

module.exports = commentsData