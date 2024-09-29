// import { Schema, model, Document } from 'mongoose';

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


import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  name: string;
  releaseDate: Date;
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const MovieSchema: Schema = new Schema({
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

export const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
