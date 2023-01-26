const express = require("express");
const { createUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController, getFollowingUserController, updateAvatarController } = require("../controllers/userController");
const { unFollowUserService } = require("../services/userService");
const upload = require("../config/update");

const userRouter = express.Router();

userRouter.post("/signup", createUserController);
userRouter.post("/login", getUserInforController);
userRouter.post("/follow", followUserController);
userRouter.post("/unfollow", unFollowUserController);
userRouter.post("/avatar", upload.single("image"), updateAvatarController);
userRouter.post("/logout");
userRouter.get("/following/:user_id", getFollowingUserController);
userRouter.post("/check-follow", checkIsFollowController);
userRouter.get("/search", searchUserController);
userRouter.get("/:username", getUserProfileController);

module.exports = userRouter 