const express = require("express");
const { createUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController } = require("../controllers/userController");
const { unFollowUserService } = require("../services/userService");

const userRouter = express.Router();

userRouter.post("/signup", createUserController);
userRouter.post("/login", getUserInforController);
userRouter.post("/follow", followUserController);
userRouter.post("/unfollow", unFollowUserController);
userRouter.post("/check-follow", checkIsFollowController);
userRouter.get("/search", searchUserController);
userRouter.get("/:username", getUserProfileController);
userRouter.post("/logout");

module.exports = userRouter 