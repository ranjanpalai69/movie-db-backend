// import { Schema, model, Document, Types } from 'mongoose';

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

import mongoose, { Schema, Document } from 'mongoose';
import { Movie } from './movie';

interface IReview extends Document {
  movieId: mongoose.Schema.Types.ObjectId;
  reviewerName?: string;
  rating: number;
  comments: string;
}

const ReviewSchema: Schema = new Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  reviewerName: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true, min: 0, max: 10 },
  comments: { type: String, required: true }
});

ReviewSchema.post('save', async function () {
  const reviews = await Review.find({ movieId: this.movieId });
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  await Movie.findByIdAndUpdate(this.movieId, { averageRating: avgRating });
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
