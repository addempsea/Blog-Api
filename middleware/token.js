const jwt = require ("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            message: "You have to be signed in"
        });
    } else{
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return next(err)
            } else {
                req.admin = decoded.isAdmin;
                next();
            }
        });
    }
}