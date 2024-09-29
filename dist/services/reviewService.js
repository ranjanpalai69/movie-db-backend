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
exports.deleteReview = exports.updateReview = exports.getReviewsForMovie = exports.addReview = void 0;
const review_1 = require("../models/review");
const movie_1 = require("../models/movie");
const addReview = (movieId, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new review_1.Review(Object.assign({ movieId }, reviewData));
    yield review.save();
    yield updateMovieRating(movieId); // Update the average rating after adding a review
    return review;
});
exports.addReview = addReview;
const getReviewsForMovie = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    return review_1.Review.find({ movieId }).sort({ createdAt: -1 });
});
exports.getReviewsForMovie = getReviewsForMovie;
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_1.Review.findByIdAndUpdate(id, data, { new: true });
    if (review) {
        yield updateMovieRating(review.movieId.toString()); // Recalculate rating
    }
    return review;
});
exports.updateReview = updateReview;
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_1.Review.findByIdAndDelete(id);
    if (review) {
        yield updateMovieRating(review.movieId.toString()); // Recalculate rating
    }
    return review;
});
exports.deleteReview = deleteReview;
const updateMovieRating = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_1.Review.find({ movieId });
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : null;
    yield movie_1.Movie.findByIdAndUpdate(movieId, { averageRating });
});
