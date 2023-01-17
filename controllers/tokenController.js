const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userSchema");
const { createNewAccressTokenService } = require("../services/tokenService");

const createNewAccressTokenController = async (req, res) => {
    try {
        const { refreshToken } = await req.body;

        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.sendStatus(400);
        }
        const userInfo = await userSchema.findOne({ email: decoded.email });
        const newAccressToken = await createNewAccressTokenService(userInfo);
        return res.status(200).send(newAccressToken);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(400);
    }
}

const verifyRefreshToken = (refreshToken) => {
    if (!refreshToken) return null;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REACT_APP_REFRESH_TOKEN_SIGN);
        if (!decoded) return null;
        return decoded;
    } catch (error) {
        console.log(error.message);
        return null
    }
}

module.exports = { createNewAccressTokenController }