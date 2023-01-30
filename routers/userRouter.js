const express = require("express");
const { createUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController, getFollowingUserController, updateAvatarController, updateProfileController, updatePasswordController, getsuggestionUserController, getFollowerUserController } = require("../controllers/userController");
const { unFollowUserService } = require("../services/userService");
const upload = require("../config/update");
const { authentication } = require("../middleware/authentication");

const userRouter = express.Router();

userRouter.post("/signup", createUserController);
userRouter.post("/login", getUserInforController);
userRouter.post("/follow", authentication, followUserController);
userRouter.post("/unfollow", authentication, unFollowUserController);
userRouter.post("/edit", authentication, updateProfileController);
userRouter.post("/password", authentication, updatePasswordController);
userRouter.post("/avatar", authentication, upload.single("image"), updateAvatarController);
userRouter.get("/suggestion/:user_id", authentication, getsuggestionUserController);
userRouter.get("/following/:user_id", authentication, getFollowingUserController);
userRouter.get("/follower/:user_id", authentication, getFollowerUserController);
userRouter.post("/check-follow", authentication, checkIsFollowController);
userRouter.get("/search", authentication, searchUserController);
userRouter.get("/:username", authentication, getUserProfileController);
userRouter.post("/logout");

module.exports = userRouter 