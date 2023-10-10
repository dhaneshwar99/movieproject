const userModel = require('../Models/user');
const jwt = require('jsonwebtoken');
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

exports.isAuthUser = async (req, res, next) => {
    if (
        (!req.headers.authorization && !req.headers.Authorization) ||
        (req.headers.authorization.length === 0 &&
            req.headers.Authorization.length === 0)
    ) {
        return res.status(401).json({
            error: true,
            errorDetails: "Invalid JWT jwtToken",
            msg: "unauthorizedRequest",
        });
    }
    const jwtToken = req.headers.authorization || req.headers.Authorization;
    const token = jwtToken.split(" ")[1];
    try {
        // console.log(token, JWT_USER_SECRET, "kke")
        const resultUser = await jwt.verify(token, JWT_USER_SECRET);
        let userData = await userModel.findById(resultUser.id);
        // console.log(userData, "data");
        if (!userData) {
            res.status(403).json({
                error: true,
                errorDetails: "Invalid JWT jwtToken",
                msg: "unauthorizedRequest",
                errorCode: 401,
            });
        }
        req.user = userData;
        return next();
    } catch (error) {
        console.log(error)
        return res
            .status(401)
            .json({
                error: true,
                errorDetails: error,
                msg: "Unauthorized Request",
                errorCode: 401,
            });
    }
};
