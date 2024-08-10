const jwt = require("jsonwebtoken");

const JWT_TOKEN = process.env.JWT_TOKEN;

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_TOKEN, { expiresIn: "1h" });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_TOKEN);
}

module.exports = {
    generateToken,
    verifyToken,
}