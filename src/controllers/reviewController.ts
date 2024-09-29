
import { Request, Response } from 'express';
import { Review } from '../models/review';
import { Movie } from '../models/movie';

export const getReviewsByMovie = async (req: Request, res: Response): Promise<any> => {
    try {
      const { movieId } = req.params;
      
      // Fetch the movie details
      const movie = await Movie.findById(movieId);
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Fetch the reviews for the movie
      const reviews = await Review.find({ movieId });
  
      // Send both movie details and reviews in the response
      res.status(200).json({
        movie,
        reviews
      });
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
