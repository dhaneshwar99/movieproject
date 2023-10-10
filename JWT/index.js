const jwt = require('jsonwebtoken');
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
// const JWT_ADMIN_SECRET_REFRESH = process.env.JWT_ADMIN_SECRET;
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const JWT_USER_FORGET_PWD_SECRET = process.env.JWT_USER_FORGET_PASSWORD_SECRET
//user session token will expired at 5 minutes
exports.jwtGeneratorAdmin = async data => {
    return await jwt.sign(data, JWT_ADMIN_SECRET, {expiresIn: '5m'});
};
//Refresh token will expired at 10 minutes
exports.refreshTokenGen = async data => {
    return await jwt.sign(data, "REFRESH" + JWT_ADMIN_SECRET, {expiresIn: '7d'});
}
exports.jwtGeneratorUser = async data => {
    //only valid for 10 minutes
    console.log(JWT_USER_SECRET);
    return await jwt.sign(data, JWT_USER_SECRET, {expiresIn: '100m'});
};

exports.refreshTokenUserGen = async data => {
    return await jwt.sign(data, "REFRESH" + JWT_USER_SECRET, {expiresIn: '7d'});
}

exports.jwtGeneratorUserForgot = async data => {
    // token will be valid for 10 minute
    return await jwt.sign(data, JWT_USER_FORGET_PWD_SECRET, {expiresIn: '10m'})
}
