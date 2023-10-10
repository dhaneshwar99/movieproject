const movieServie = require('../Services/movie.services')
const express = require('express')
const { getPagination, getPagingData } = require('../utils/index')
const movieService = new movieServie();



class MovieController {


    static async getMoviesList(req, res) {

        const { page = 1, size = 20, query } = req.query;
        const { limit, offset } = getPagination(page, size);
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { mobile: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                ],
            };
        }
        try {
            const totalCount = await movieServie.getMoviesCount(filter);
            // console.log(totalCount, filter, "ddddd")
            const getuserlist = await movieServie.getMoviesList(filter, limit, offset);
            const response = getPagingData(totalCount, page, limit, getuserlist);
            return res.json({ error: false, msg: "OK", response });
            // console.log(getuserlist);
        } catch (error) {
            console.log(error);
        }
    }
    static async newMovie(request, response) {
        try {
            const data = await movieServie.createMovie(request.body);
            return response.status(201).json(data);

            // return res.json({error: false, msg: "OK", response})
        } catch (error) {
            console.log(error);
            // return res.status(400).json({ error: true, msg: e.message });
        }
    }

    static async updateMovie(req, response) {
        try {
            const id = req.params.id;
            const x = await movieServie.getMovieById(id)
            if (!x) {
                return response.status(404).json("Not Found");
            }
            const data = await movieServie.updateMovie(req.body, x.id);
            return response.status(201).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteMovie(req, response) {
        const id = req.params.id;
        const x = await movieServie.getMovieById(id)
        if (!x) {
            return response.status(404).json("Not Found");
        }
        const k = await movieServie.deletemovie(x.id);
        return response.status(202).json("Data delete Sucessfully")
    }

}
module.exports = MovieController