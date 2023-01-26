const { createUserService, checkLoginService, followUserService, unFollowUserService, searchUserService, getUserProfileService, checkIsFollowService, getFollowingService, updateAvatarService } = require("../services/userService");

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
        //Response
        // console.log(result);
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
        //Response
        // console.log(result);
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
        // console.log(image);
        const result = await updateAvatarService(updateAvatarInfo.user_id, image);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);

    }
}

module.exports = { updateAvatarController, createUserController, getFollowingUserController, getUserInforController, followUserController, unFollowUserController, searchUserController, getUserProfileController, checkIsFollowController }