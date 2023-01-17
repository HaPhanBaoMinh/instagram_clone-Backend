const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userFollowerSchema = new Schema({
    user_id: ObjectID,
    follower_id: ObjectID,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const userFollowersData = myDB.model("user_follower", userFollowerSchema);

module.exports = userFollowersData