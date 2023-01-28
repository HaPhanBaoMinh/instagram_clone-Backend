const userSchema = require("../Models/userSchema");
const userFollowerSchema = require("../Models/user_followers");
const postSchema = require("../Models/postSchema");
const { createNewAccressTokenService, createRefreshTokenService } = require("./tokenService");
const { ObjectId } = require("mongodb");

const createUserService = async ({ name, username, bio, email, phone, gender, password }) => {
    try {
        const isExistEmail = await userSchema.findOne({ email });
        const isExistPhone = await userSchema.findOne({ phone });
        const isExistUserName = await userSchema.findOne({ username });

        let result;

        //Check is exist
        if (isExistEmail && email) {
            result = { status: false, message: "Email already in use" }
            return result;
        }

        if (isExistPhone && phone) {
            result = { status: false, message: "Phone already in use" }
            return result;
        }

        if (isExistUserName && username) {
            result = { status: false, message: "Username already in use" }
            return result;
        }


        //Save user
        const newUser = userSchema({ name, username, bio, email, phone, gender, password })
        const insert = await newUser.save();

        //Token
        const accessToken = await createNewAccressTokenService(newUser)
        const refreshToken = await createRefreshTokenService(newUser)
        const token = {
            accessToken: accessToken.accessToken,
            timeExpired: accessToken.timeExpired,
            refreshToken: refreshToken
        }

        return { status: true, insert, token }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const checkLoginService = async ({ payload, password }) => {
    let result;
    if (!payload || !password) {
        return { status: false, message: "Incorrect userinfo or password" }
    }
    try {
        result = await userSchema.findOne({ $or: [{ username: payload }, { phone: payload }, { email: payload }] });

        if (!result) {
            return { status: false, message: "Incorrect user info or password" }
        }


        //Token
        const accessToken = await createNewAccressTokenService(result)
        const refreshToken = await createRefreshTokenService(result)
        const token = {
            accessToken: accessToken.accessToken,
            timeExpired: accessToken.timeExpired,
            refreshToken: refreshToken
        }

        return { status: true, result, token }

    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const followUserService = async ({ user_id, follower_id }) => {
    const userInfo = await userSchema.findOne({ _id: user_id });
    const followerInfo = await userSchema.findOne({ _id: follower_id });
    try {
        if (!userInfo || !followerInfo) return { status: false, message: "Wrrong id!" }
        const newFollow = userFollowerSchema({ user_id, follower_id });
        const insert = await newFollow.save();
        return { status: true, insert }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const unFollowUserService = async ({ user_id, follower_id }) => {
    const userInfo = await userSchema.findOne({ _id: user_id });
    const followerInfo = await userSchema.findOne({ _id: follower_id });
    try {
        if (!userInfo || !followerInfo) return { status: false, message: "Wrrong id!" }
        const { deletedCount } = await userFollowerSchema.deleteOne({ user_id: userInfo._id, follower_id: followerInfo._id });
        if (!deletedCount) {
            return { status: true, message: "No thing be deleted" }
        }
        return { status: true }
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const searchUserService = async (searchValue) => {
    try {
        if (searchValue.toString().trim().length == 0) return { status: true, result: [] }

        const result = await userSchema.find({
            $or: [
                { username: { $regex: '.*' + searchValue + '.*' } },
                { name: { $regex: '.*' + searchValue + '.*' } },
            ]
        }).select("username avatar name").limit(10)

        if (result) return { status: true, result };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getUserProfileService = async (username) => {

    try {
        if (username.toString().trim().length == 0) return { status: true, result: undefined }
        //Get user info
        const userInfo = await userSchema.findOne({ username }).select("_id username avatar email bio name");
        const following = await userFollowerSchema.countDocuments({ user_id: userInfo._id });
        const followers = await userFollowerSchema.countDocuments({ follower_id: userInfo._id });
        const posts = await postSchema.countDocuments({ user_id: userInfo._id });

        //Get post
        const postList = await postSchema.find({ user_id: userInfo._id }).select("total_likes total_comments images caption created_at updated_at");;

        return { status: true, result: { ...userInfo._doc, following, followers, posts, postList } };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const checkIsFollowService = async ({ user_id, follower_id }) => {
    if (!user_id || !follower_id) return { status: false, message: "Wrrong id!" };

    try {
        const result = await userFollowerSchema.findOne({ user_id, follower_id });
        if (result) {
            return { status: true, isNewFollow: false };
        }
        return { status: true, isNewFollow: true };
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getFollowingService = async (user_id) => {
    try {
        const result = await userFollowerSchema.aggregate([
            {
                "$match": {
                    "user_id": ObjectId(user_id),
                }
            },
            {
                "$lookup": {
                    "from": "users",
                    "localField": "follower_id",
                    "pipeline": [
                        {
                            "$project": { "name": 1, "username": 1, "avatar": 1 }
                        }
                    ],
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            { "$unwind": '$user' },
        ])
        return {
            status: true,
            result
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const updateAvatarService = async (user_id, image) => {
    try {
        console.log(user_id);
        console.log(image);
        const result = await userSchema.findOneAndUpdate({ _id: user_id }, { avatar: image.filename });
        return { status: true, newAvatar: image.filename };
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const updateProfileService = async ({ newName, newUserName, newEmail, newPhone, newBio, _id }) => {
    try {
        const isExistEmail = await userSchema.findOne({ email: newEmail, _id: { $ne: _id } });
        const isExistPhone = await userSchema.findOne({ phone: newPhone, _id: { $ne: _id } });
        const isExistUserName = await userSchema.findOne({ username: newUserName, _id: { $ne: _id } });

        let result;

        //Check is exist
        if (isExistEmail) {
            result = { status: false, message: "Email already in use" }
            return result;
        }

        if (isExistPhone) {
            result = { status: false, message: "Phone already in use" }
            return result;
        }

        if (isExistUserName) {
            result = { status: false, message: "Username already in use" }
            return result;
        }

        result = await userSchema.findByIdAndUpdate(_id, { name: newName, username: newUserName, email: newEmail, phone: newPhone, bio: newBio });
        return { status: true }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const changePasswordService = async ({ oldPass, newPass, _id }) => {
    try {
        console.log({ oldPass, newPass, _id });
        const result = await userSchema.findOneAndUpdate({ _id, password: oldPass }, { password: newPass });
        if (!result) {
            return { status: false, message: "Incorrect old password!" }
        }
        return { status: true, newPassword: newPass }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getSuggestionsUserService = async (user_id) => {
    try {
        const result = await userSchema.aggregate([
            {
                "$lookup": {
                    "from": "user_followers",
                    "localField": "_id",
                    "foreignField": "follower_id",
                    "as": "user"
                }
            },
            {
                "$match": {
                    "_id": {
                        "$ne": ObjectId(user_id)
                    },
                    "user": []
                }
            },
            { "$limit": 5 }
            // { "$unwind": '$user' },
            // {
            //     "$project": { "user": 1 }
            // }
        ])
        return { status: true, result }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { createUserService, checkLoginService, followUserService, unFollowUserService, searchUserService, getUserProfileService, checkIsFollowService, getFollowingService, updateAvatarService, updateProfileService, changePasswordService, getSuggestionsUserService }