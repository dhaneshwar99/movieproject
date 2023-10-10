const express = require('express')
const jwt = require("jsonwebtoken");
const UserService = require('../Services/user.service');
const bcrypt = require('bcrypt')
const { hashPassword } = require('../utils/auth');



const { jwtGeneratorUser } = require('../JWT');
const userService = new UserService()

const comparePassword = (str, hash) => {
    try {
        return bcrypt.compare(str, hash);
    } catch (er) {
        console.log(er);
        return false;
    }
};

class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body
            // console.log(email, "email")
            const userData = await UserService.getUserByEmail(email)
            if (!userData)
                return res
                    .status(404)
                    .jsonp({ error: true, msg: `${req.body.email} is not registered email` });
            const userPassword = userData.password;
            const bodyPassword = hashPassword(password)
            const flag = comparePassword(bodyPassword, userPassword);
            if (!flag) return res.jsonp({ error: true, msg: "Auth failed" });
            const token = await jwtGeneratorUser({ id: userData._id });
            console.log(token);
            let x = await UserService.updateUser({ token: token }, userData.id);

            return res.status(200).json(x);

        } catch (error) {
            console.log(error)
        }

    }

    static async logout(request, response) {
        try {
            const user = request.user._id;
            // const userData = await UserService.getUserById(user)
            // const token = userData.token;
            await UserService.updateUser({ token: null }, user)
            console.log(user);
            return response.status(200).json('logout successfully');
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = AuthController;