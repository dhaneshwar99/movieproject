// const express = require("express");
// const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SALT_ROUND = parseInt(process.env.SALT_ROUND);
const hashPassword = (str) => {
    try {
        const salt = bcrypt.genSaltSync(SALT_ROUND);
        return bcrypt.hashSync(str, salt);
    } catch (e) {
        console.log(e);
        return null;
    }
};
module.exports = {
    hashPassword
};