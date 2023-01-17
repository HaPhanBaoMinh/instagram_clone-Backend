const jwt = require("jsonwebtoken");

const createNewAccressTokenService = async (payload) => {
    const { name, username, bio, email, phone, gender, password } = await payload
    const accessToken = jwt.sign({ name, username, bio, email, phone, gender, password },
        process.env.REACT_APP_ACCESS_TOKEN_SIGN, {
        expiresIn: '120s'
    });

    return {
        accessToken: accessToken,
        timeExpired: Date.now() + (2 * 60 * 1000),
    };
}

const createRefreshTokenService = async (payload) => {
    const { name, username, bio, email, phone, gender, password } = await payload
    const refreshToken = jwt.sign({ name, username, bio, email, phone, gender, password },
        process.env.REACT_APP_REFRESH_TOKEN_SIGN, {
        expiresIn: '2h'
    });

    return refreshToken;

}

module.exports = { createNewAccressTokenService, createRefreshTokenService }