const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    bio: String,
    email: String,
    phone: String,
    gender: String,
    password: String,
    bio: {
        type: String,
        maxLength: 800
    },
    avatar: {
        type: String,
        default: "defaultAvatar.jpeg"
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const myDB = mongoose.connection.useDb('Instagram');
const userData = myDB.model("user", userSchema);

module.exports = userData