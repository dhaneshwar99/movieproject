const mongoose = require('mongoose')
const user = require('../Models/user')
class UserService {

    // static async getMoviesList(condition, limit, skip) {
    //     try {
    //         return movie
    //             .find(condition)
    //             .sort({ createdAt: -1 })
    //             .limit(limit)
    //             .skip(skip)
    //     } catch (error) {
    //         console.log(error)
    //     }


    // }
    static async createUser(option) {
        try {
            const data = new user(option);
             await data.save();
        } catch (error) {
            console.log(error)
        }
    }
    static async updateUser(option, id) {
        return await user
            .findByIdAndUpdate(id, option, { new: true })
            .then((data) => {
                return data;
            })
            .catch((er) => {
                console.log(er)
            });
    }

    static async deleteUser(_id) {
        return await user
            .findByIdAndDelete(_id)
            .then((data) => {
                return data;
            })
            .catch((er) => {
                throw new Error(er);
            });
    }
    // static async getMoviesCount(condition) {

    //     try {
    //         const data = await movie.find(condition);
    //         return data.length
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }
    static async getUserById(id) {
        try {
            return await user.findById(id)

        } catch (error) {
            console.log(error)
        }
    }

    static async getUserByEmail(email) {
        try {
            return await user.findOne({ email: email })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = UserService;