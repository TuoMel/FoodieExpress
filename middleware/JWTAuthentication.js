const jwt = require('jsonwebtoken');

exports.Authentication = (req, res, next) => {
    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('token')
        return res.redirect('/')
    }
}

