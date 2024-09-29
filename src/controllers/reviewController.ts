// import { Request, Response } from 'express';
// import * as reviewService from '../services/reviewService';
// import { handleError } from '../utils/errorHandler';

// export const addReview = async (req: Request, res: Response) => {
//   try {
//     const review = await reviewService.addReview(req.params.movieId, req.body);
//     res.status(201).json({ message: 'Review added successfully', review });
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// export const getReviewsForMovie = async (req: Request, res: Response) => {
//   try {
//     const reviews = await reviewService.getReviewsForMovie(req.params.movieId);
//     res.status(200).json(reviews);
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// export const updateReview = async (req: Request, res: Response) => {
//   try {
//     const review = await reviewService.updateReview(req.params.id, req.body);
//     if (!review) return res.status(404).json({ message: 'Review not found' });
//     res.status(200).json({ message: 'Review updated successfully', review });
//   } catch (error) {
//     handleError(res, error);
//   }
// };

// export const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const review = await reviewService.deleteReview(req.params.id);
//     if (!review) return res.status(404).json({ message: 'Review not found' });
//     res.status(200).json({ message: 'Review deleted successfully' });
//   } catch (error) {
//     handleError(res, error);
//   }
// };


import { Request, Response } from 'express';
import { Review } from '../models/review';
import { Movie } from '../models/movie';

export const getReviewsByMovie = async (req: Request, res: Response) => {
    console.log(req.params)
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const { movieId, reviewerName, rating, comments } = req.body;
    const newReview = new Review({ movieId, reviewerName, rating, comments });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Error adding review', error });
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comments } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(id, { rating, comments }, { new: true });
    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting review', error });
  }
};
