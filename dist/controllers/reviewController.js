"use strict";
// import { Request, Response } from 'express';
// import * as reviewService from '../services/reviewService';
// import { handleError } from '../utils/errorHandler';
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
exports.deleteReview = exports.editReview = exports.addReview = exports.getReviewsByMovie = void 0;
const review_1 = require("../models/review");
const getReviewsByMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const { movieId } = req.params;
        const reviews = yield review_1.Review.find({ movieId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.getReviewsByMovie = getReviewsByMovie;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieId, reviewerName, rating, comments } = req.body;
        const newReview = new review_1.Review({ movieId, reviewerName, rating, comments });
        yield newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    }
    catch (error) {
        res.status(400).json({ message: 'Error adding review', error });
    }
});
exports.addReview = addReview;
const editReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating, comments } = req.body;
        const updatedReview = yield review_1.Review.findByIdAndUpdate(id, { rating, comments }, { new: true });
        res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating review', error });
    }
});
exports.editReview = editReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield review_1.Review.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting review', error });
    }
});
exports.deleteReview = deleteReview;
