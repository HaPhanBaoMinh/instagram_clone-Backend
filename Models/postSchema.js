const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    user_id: {
        // type: String,
        type: Schema.Types.ObjectId,
        required: true
    },
    total_likes: {
        type: Number,
        default: 0,
        min: 0
    },
    total_comments: {
        type: Number,
        default: 0,
        min: 0
    },
    images: {
        type: [Object],
        default: []
    },
    caption: {
        type: String,
        maxLength: 800
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const myDB = mongoose.connection.useDb('Instagram');
const postData = myDB.model("post", postSchema);

module.exports = postData