require("dotenv").config();
const express = require('express');
const morgan = require("morgan");
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const cors = require('cors');
const tokenRouter = require("./routers/tokenRouter");
const postRouter = require("./routers/postRouter");
const multer = require('multer');
const imageRouter = require("./routers/imageRouter");
const { authentication } = require("./middleware/authentication");
const commentRouter = require("./routers/commentRouter");
const likeRouter = require("./routers/likeRouter");
const feedRouter = require("./routers/feedRouter");
const chatRouter = require("./routers/chatRouter");
require("./connection/connection");
const socket = require("socket.io");
const { likeNotificationService, commentNotificationService } = require("./services/postService");
const { createNewNotificationService, getNotificationService } = require("./services/notificationService");
const notificationRouter = require("./routers/notificationRouter");
const { v4: uuidv4 } = require('uuid');

const app = express()
const forms = multer();
const PORT = process.env.REACT_APP_PORT || 5000;
// const MONGO_URL = process.env.REACT_APP_MONGO_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(morgan("tiny"));

// Router
app.get('/data', authentication, async (req, res) => {
    res.send("Security Data");
})

app.use('/user', userRouter);
app.use('/token', tokenRouter);
app.use('/post', postRouter);
app.use('/image', imageRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/feed', feedRouter);
app.use('/chat', chatRouter);
app.use('/notification', notificationRouter);

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
});

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = socket(server, {
    cors: {
        origin: ["http://192.168.1.8:3000", "http://localhost:3000", "https://instagram-clone-frontend.onrender.com", 'https://instagram-clone-56052.web.app'],
        Credential: true,
    },
});

global.onlineUser = new Map();;

global.io = io;

io.on("connection", (socket) => {
    const newConnectUserId = socket.handshake.query.userId
    // console.log(socket.id)
    onlineUser.set(newConnectUserId, socket.id);

    socket.on("send_message", messageInfo => {
        // console.log(messageInfo);
        const recipientSocketId = onlineUser.get(messageInfo.recipient_id);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("message_recieve", messageInfo);
        }
    })

    socket.on("like_post", async likeInfo => {
        let result = await likeNotificationService(likeInfo.post_id, likeInfo.user_id);
        console.log(result);
        const recipientSocketId = onlineUser.get(result.postInfo.user_id.toString());
        await createNewNotificationService(result.postInfo.user_id.toString(), result.postInfo._id.toString(), result.action_userInfo._id.toString(), 'like your post');
        if (recipientSocketId) {
            console.log(recipientSocketId);
            io.to(recipientSocketId).emit("notification_like", result = { ...result, type: "like your post", _id: uuidv4() });
        }
    })

    socket.on("comment_post", async commentInfo => {
        let result = await commentNotificationService(commentInfo.post_id, commentInfo.user_id);
        console.log(result);
        const recipientSocketId = onlineUser.get(result.postInfo.user_id.toString());
        await createNewNotificationService(result.postInfo.user_id.toString(), result.postInfo._id.toString(), result.action_userInfo._id.toString(), 'comment your post');
        if (recipientSocketId) {
            console.log(recipientSocketId);
            io.to(recipientSocketId).emit("notification_comment", result = { ...result, type: "comment your post", _id: uuidv4() });
        }
    })

    socket.on("disconnect", () => {

    })
})

// mongoose.set("strictQuery", false);
// mongoose
//     .connect(MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then((res, rej) => console.log("Connect successfully!"))
//     .catch((err) => console.log(err.message));



