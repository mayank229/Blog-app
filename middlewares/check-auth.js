const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/index');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    try {
        // Getting the token from the cookies sent when logging in and decoding it
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, jwtSecret);
        // Getting the user data from the db on the basis of _id (decoded from jwt token)
        const user = await User.getUserById(decoded._id);
        if (!user) {
            throw new Error();
        }
        // Saving the user in the req object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({"error": "Please login first to perform this action"})
    }
}