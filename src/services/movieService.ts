import {Movie} from '../models/movie';
import {Review} from '../models/review';

export const addMovie = async (data: any) => {
  const movie = new Movie(data);
  await movie.save();
  return movie;
};

export const getMovies = async () => {
  return Movie.find().sort({ createdAt: -1 });
};

export const getMovieById = async (id: string) => {
  return Movie.findById(id);
};

export const updateMovie = async (id: string, data: any) => {
  return Movie.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMovie = async (id: string) => {
  await Review.deleteMany({ movieId: id }); // Delete associated reviews
  return Movie.findByIdAndDelete(id);
};

export const searchMovies = async (query: string) => {
  return Movie.find({ name: new RegExp(query, 'i') });
};
