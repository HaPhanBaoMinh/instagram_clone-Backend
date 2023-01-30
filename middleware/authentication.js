const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userSchema");

const authentication = async (req, res, next) => {
    const token = await req.headers.authorization;
    try {
        const decoded = await verifyAccessToken(token);
        if (!decoded) {
            return res.sendStatus(401);
        }
        const userInfo = await userSchema.findOne({ email: decoded.email });
        if (!userInfo) return res.sendStatus(401);
        next();

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(401);
    }

}

module.exports = { authentication }

const verifyAccessToken = (token) => {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SIGN);
        if (!decoded) return null;
        return decoded;
    } catch (error) {
        console.log(error.message);
        return null
    }
}