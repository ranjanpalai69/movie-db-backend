"use strict";
// import { Schema, model, Document, Types } from 'mongoose';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Review = void 0;
// interface IReview extends Document {
//   movieId: Types.ObjectId;
//   reviewerName?: string;
//   rating: number;
//   reviewComments: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
// const reviewSchema = new Schema<IReview>(
//   {
//     movieId: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
//     reviewerName: { type: String, default: 'Anonymous' },
//     rating: { type: Number, required: true, min: 0, max: 10 },
//     reviewComments: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// const Review = model<IReview>('Review', reviewSchema);
// export default Review;
const mongoose_1 = __importStar(require("mongoose"));
const movie_1 = require("./movie");
const ReviewSchema = new mongoose_1.Schema({
    movieId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Movie', required: true },
    reviewerName: { type: String, default: 'Anonymous' },
    rating: { type: Number, required: true, min: 0, max: 10 },
    comments: { type: String, required: true }
});
ReviewSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const reviews = yield exports.Review.find({ movieId: this.movieId });
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        yield movie_1.Movie.findByIdAndUpdate(this.movieId, { averageRating: avgRating });
    });
});
exports.Review = mongoose_1.default.model('Review', ReviewSchema);
