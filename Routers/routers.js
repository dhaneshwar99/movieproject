const express = require("express");
const router = express.Router();
const movieController = require('../Controllers/movie.controller')
const userController = require('../Controllers/user.controller');
const authController = require('../Controllers/auth.controller');
const { isAuthUser } = require("../MIddleware/auth");


//Auth routes
router.post("/login", authController.login);
router.post('/logout',isAuthUser, authController.logout)


// user routes
router.post("/user/new", userController.newUser)
router.put("/user/:id", userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

// movies routes
router.get("/movie/list", isAuthUser, movieController.getMoviesList)
router.post("/movie/new", isAuthUser, movieController.newMovie)
router.put("/movie/:id", isAuthUser, movieController.updateMovie)
router.delete("/movie/:id", isAuthUser, movieController.deleteMovie)
module.exports = router;