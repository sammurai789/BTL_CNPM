const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_KEY_TOKEN, (error, user) => {
            if (error) {
                res.status(403).json("Token ko co hieu luc");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(404).json("ban phai dang nhap");
    }
    // res.status(404).json({headers: req.headers});
}

module.exports = verifyToken;