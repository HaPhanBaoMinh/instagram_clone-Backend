const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
    },
    post_id: ObjectID,

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const likesData = myDB.model("like", likeSchema);

module.exports = likesData