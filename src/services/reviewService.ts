import { Review } from '../models/review';
import { Movie } from '../models/movie';

// Define a type for ReviewData
interface ReviewData {
  reviewerName?: string; // Optional
  rating: number; // Assuming this is mandatory
  reviewComments: string; // Assuming this is mandatory
}

export const addReview = async (movieId: string, reviewData: ReviewData) => {
  const review = new Review({ movieId, ...reviewData });
  await review.save();

  await updateMovieRating(movieId); // Update the average rating after adding a review
  return review;
};

export const getReviewsForMovie = async (movieId: string) => {
  return Review.find({ movieId }).sort({ createdAt: -1 });
};

export const updateReview = async (id: string, data: Partial<ReviewData>) => {
  const review = await Review.findByIdAndUpdate(id, data, { new: true });
  if (review) {
    await updateMovieRating(review.movieId.toString()); // Recalculate rating
  }
  return review;
};

export const deleteReview = async (id: string) => {
  const review = await Review.findByIdAndDelete(id);
  if (review) {
    await updateMovieRating(review.movieId.toString()); // Recalculate rating
  }
  return review;
};

const updateMovieRating = async (movieId: string) => {
  const reviews = await Review.find({ movieId });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null;

  await Movie.findByIdAndUpdate(movieId, { averageRating });
};
