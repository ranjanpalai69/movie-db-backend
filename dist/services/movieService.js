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
exports.searchMovies = exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getMovies = exports.addMovie = void 0;
const movie_1 = require("../models/movie");
const review_1 = require("../models/review");
const addMovie = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = new movie_1.Movie(data);
    yield movie.save();
    return movie;
});
exports.addMovie = addMovie;
const getMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    return movie_1.Movie.find().sort({ createdAt: -1 });
});
exports.getMovies = getMovies;
const getMovieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return movie_1.Movie.findById(id);
});
exports.getMovieById = getMovieById;
const updateMovie = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return movie_1.Movie.findByIdAndUpdate(id, data, { new: true });
});
exports.updateMovie = updateMovie;
const deleteMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield review_1.Review.deleteMany({ movieId: id }); // Delete associated reviews
    return movie_1.Movie.findByIdAndDelete(id);
});
exports.deleteMovie = deleteMovie;
const searchMovies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return movie_1.Movie.find({ name: new RegExp(query, 'i') });
});
exports.searchMovies = searchMovies;
