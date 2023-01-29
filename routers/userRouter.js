const express = require("express");
const { createUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController, getFollowingUserController, updateAvatarController, updateProfileController, updatePasswordController, getsuggestionUserController, getFollowerUserController } = require("../controllers/userController");
const { unFollowUserService } = require("../services/userService");
const upload = require("../config/update");

const userRouter = express.Router();

userRouter.post("/signup", createUserController);
userRouter.post("/login", getUserInforController);
userRouter.post("/follow", followUserController);
userRouter.post("/unfollow", unFollowUserController);
userRouter.post("/edit", updateProfileController);
userRouter.post("/password", updatePasswordController);
userRouter.post("/avatar", upload.single("image"), updateAvatarController);
userRouter.get("/suggestion/:user_id", getsuggestionUserController);
userRouter.get("/following/:user_id", getFollowingUserController);
userRouter.get("/follower/:user_id", getFollowerUserController);
userRouter.post("/check-follow", checkIsFollowController);
userRouter.get("/search", searchUserController);
userRouter.get("/:username", getUserProfileController);
userRouter.post("/logout");

module.exports = userRouter 