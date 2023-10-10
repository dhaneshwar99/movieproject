const mongoose = require('mongoose')
const movie = require('../Models/movie')
class MovieService {




    static async getMoviesList(condition, limit, skip) {
        try {
            return movie
                .find(condition)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
        } catch (error) {
            console.log(error)
        }


    }
    static async createMovie(option) {
        try {
            const data = new movie(option);
            return await data.save();
        } catch (error) {
            console.log(error)
        }
    }
    static async updateMovie(option, id) {
        return await movie
            .findByIdAndUpdate(id, option, { new: true })
            .then((data) => {
                return data;
            })
            .catch((er) => {
                console.log(er)
            });
    }

    static async deletemovie(_id) {
        return await movie
            .findByIdAndDelete(_id)
            .then((data) => {
                return data;
            })
            .catch((er) => {
                throw new Error(er);
            });
    }
    static async getMoviesCount(condition) {

        try {
            const data = await movie.find(condition);
            return data.length
        } catch (error) {
            console.log(error)
        }

    }
    static async getMovieById(id) {
        try {
            return await movie.findById(id)

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = MovieService;