const { createPostService } = require("../services/postService");

const createPostController = async (req, res) => {
    try {
        const body = req.body;
        const images = req.files;
        // console.log(req.files);
        const result = await createPostService({ ...body, images });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

module.exports = { createPostController }