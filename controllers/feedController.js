const { getFeedsService } = require("../services/feedsService");
const getFeedController = async (req, res) => {
    try {
        const userId = await req.params.user_id;
        const result = await getFeedsService(userId);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send(result.message);
    }
}

module.exports = { getFeedController }