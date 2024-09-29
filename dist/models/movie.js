"use strict";
// import { Schema, model, Document } from 'mongoose';
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
// interface IMovie extends Document {
//   name: string;
//   releaseDate: Date;
//   averageRating: number | null;
//   createdAt: Date;
//   updatedAt: Date;
// }
// const movieSchema = new Schema<IMovie>(
//   {
//     name: { type: String, required: true },
//     releaseDate: { type: Date, required: true },
//     averageRating: { type: Number, default: null }, // Initially null, gets updated with reviews
//   },
//   { timestamps: true } // Adds createdAt and updatedAt fields automatically
// );
// const Movie = model<IMovie>('Movie', movieSchema);
// export default Movie;
const mongoose_1 = __importStar(require("mongoose"));
const MovieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    averageRating: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
MovieSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.Movie = mongoose_1.default.model('Movie', MovieSchema);
