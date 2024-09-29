"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.editMovie = exports.addMovie = exports.getAllMovies = void 0;
const movie_1 = require("../models/movie");
// Get all movies
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query; // Get the search query from the request
        // Create a filter for searching if a search query is provided
        const filter = search ? { name: new RegExp(search, 'i') } : {}; // case-insensitive search
        const movies = yield movie_1.Movie.find(filter); // Fetch movies based on the filter
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.getAllMovies = getAllMovies;
// Add a new movie
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, releaseDate } = req.body;
        // Check if the movie already exists
        const existingMovie = yield movie_1.Movie.findOne({ name });
        if (existingMovie) {
            return res.status(400).json({ message: "Movie already exists" });
        }
        const newMovie = new movie_1.Movie({ name, releaseDate });
        yield newMovie.save();
        res
            .status(201)
            .json({ message: "Movie added successfully", movie: newMovie });
    }
    catch (error) {
        res.status(400).json({ message: "Error adding movie", error });
    }
});
exports.addMovie = addMovie;
// Edit a movie
const editMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, releaseDate } = req.body;
        // Check if the movie exists
        const existingMovie = yield movie_1.Movie.findById(id);
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const updatedMovie = yield movie_1.Movie.findByIdAndUpdate(id, { name, releaseDate }, { new: true });
        res
            .status(200)
            .json({ message: "Movie updated successfully", movie: updatedMovie });
    }
    catch (error) {
        res.status(400).json({ message: "Error updating movie", error });
    }
});
exports.editMovie = editMovie;
// Delete a movie
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if the movie exists
        const existingMovie = yield movie_1.Movie.findById(id);
        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        yield movie_1.Movie.findByIdAndDelete(id);
        res.status(200).json({ message: "Movie deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting movie", error });
    }
});
exports.deleteMovie = deleteMovie;
