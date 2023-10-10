const express = require('express')
const { getPagination, getPagingData } = require('../utils/index');
const userService = require('../Services/user.service');
const { hashPassword } = require('../utils/auth');
const userServices = new userService();



class UserController {


    // static async getMovielist(req, res) {

    //     const { page = 1, size = 20, query } = req.query;
    //     const { limit, offset } = getPagination(page, size);
    //     let filter = {};
    //     if (query) {
    //         filter = {
    //             $or: [
    //                 { name: { $regex: query, $options: "i" } },
    //                 { mobile: { $regex: query, $options: "i" } },
    //                 { email: { $regex: query, $options: "i" } },
    //             ],
    //         };
    //     }
    //     try {
    //         const totalCount = await movieServie.getMoviesCount(filter);
    //         console.log(totalCount, filter, "ddddd")
    //         const getuserlist = await movieServie.getMoviesList(filter, limit, offset);
    //         const response = getPagingData(totalCount, page, limit, getuserlist);
    //         return res.json({ error: false, msg: "OK", response });
    //         // console.log(getuserlist);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    static async newUser(request, response) {
        try {

            const option = {
                ...request.body,
                url: request.body.url,
                password: hashPassword(request.body.password)
            }
            const data = await userService.createUser(option);
            return response.status(201).json(data);

            // return response.json({error: false, msg: "OK", response})
        } catch (error) {
            console.log(error);
            // return res.status(400).json({ error: true, msg: e.message });
        }
    }

    static async updateUser(req, response) {
        try {
            const id = req.params.id;
            const x = await userService.getUserById(id)
            if (!x) {
                return response.status(404).json("Not Found");
            }
            const data = await userService.updateUser(req.body, x.id);
            return response.status(201).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteUser(req, response) {
        const id = req.params.id;
        const x = await userService.getUserById(id)
        if (!x) {
            return response.status(404).json("Not Found");
        }
        const k = await userService.deleteUser(x.id)
        return response.status(202).json("Data delete Sucessfully")
    }

}
module.exports = UserController