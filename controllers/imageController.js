const { getImageService } = require("../services/imagesService");

const getImageController = async (req, res) => {
    const filename = await req.params.filename;
    try {
        await getImageService(filename, res);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

module.exports = { getImageController }