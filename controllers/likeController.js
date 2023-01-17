const { createLikeService, deleteLikeService, checkIsLikePostService } = require("../services/likesService");

const createLikeController = async (req, res) => {
    try {
        const body = req.body;
        const result = await createLikeService(body);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const deleteLikeController = async (req, res) => {
    try {
        const body = req.body;
        const result = await deleteLikeService(body);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const checkIsLikePostController = async (req, res) => {
    try {
        const { user_id, post_id } = await req.body;
        const result = await checkIsLikePostService({ user_id, post_id });
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


module.exports = { createLikeController, deleteLikeController, checkIsLikePostController }