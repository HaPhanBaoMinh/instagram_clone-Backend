const { createUserService, checkLoginService, followUserService, unFollowUserService, searchUserService, getUserProfileService, checkIsFollowService, getFollowingService, updateAvatarService, updateProfileService, changePasswordService, getSuggestionsUserService, getFollowerService } = require("../services/userService");

const createUserController = async (req, res) => {
    try {
        const newUserInfo = req.body;
        const result = await createUserService(newUserInfo);

        // Response
        return res.status(200).send(result);

    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getUserInforController = async (req, res) => {
    try {
        const userInfo = await req.body;
        const result = await checkLoginService(userInfo);
        //Response
        if (result.status === false) {
            return res.status(200).send(result);
        }
        if (result.status === true) {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const followUserController = async (req, res) => {
    try {
        const { user_id, follower_id } = await req.body;
        const result = await followUserService({ user_id, follower_id });
        //Response
        if (result.status === false) {
            return res.status(200).send(result);
        }
        if (result.status === true) {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const unFollowUserController = async (req, res) => {
    try {
        const { user_id, follower_id } = await req.body;
        const result = await unFollowUserService({ user_id, follower_id });
        //Response
        if (result.status === false) {
            return res.status(200).send(result);
        }
        if (result.status === true) {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const searchUserController = async (req, res) => {
    try {
        const { value } = await req.query;
        const result = await searchUserService(value);
        //Response
        if (result.status === false) {
            return res.status(200).send(result);
        }
        if (result.status === true) {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result);
    }
}

const getUserProfileController = async (req, res) => {
    try {
        const username = await req.params.username;
        const result = await getUserProfileService(username);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const checkIsFollowController = async (req, res) => {
    try {
        const { user_id, follower_id } = await req.body;
        const result = await checkIsFollowService({ user_id, follower_id });
        //Response
        if (result.status === false) {
            return res.status(200).send(result);
        }
        if (result.status === true) {
            return res.status(200).send(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getFollowingUserController = async (req, res) => {
    try {
        const user_id = await req.params.user_id;
        const result = await getFollowingService(user_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getFollowerUserController = async (req, res) => {
    try {
        const user_id = await req.params.user_id;
        const result = await getFollowerService(user_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const updateAvatarController = async (req, res) => {
    try {
        const updateAvatarInfo = await req.body;
        const image = await req.file;
        const result = await updateAvatarService(updateAvatarInfo.user_id, image);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);

    }
}

const updateProfileController = async (req, res) => {
    try {
        const updateProfile = await req.body;
        const result = await updateProfileService(updateProfile);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const updatePass = await req.body
        const result = await changePasswordService(updatePass);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

const getsuggestionUserController = async (req, res) => {
    try {
        const user_id = await req.params.user_id;
        const result = await getSuggestionsUserService(user_id);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

module.exports = { getFollowerUserController, getsuggestionUserController, updatePasswordController, updateProfileController, updateAvatarController, createUserController, getFollowingUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController }