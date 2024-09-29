import { Request, Response } from "express";
import { Movie } from "../models/movie";

// Get all movies
export const getAllMovies = async (req: Request, res: Response) => {
    try {
      const { search } = req.query; // Get the search query from the request
  
      // Create a filter for searching if a search query is provided
      const filter = search ? { name: new RegExp(search as string, 'i') } : {}; // case-insensitive search
  
      const movies = await Movie.find(filter); // Fetch movies based on the filter
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };

// Add a new movie
export const addMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, releaseDate } = req.body;

    // Check if the movie already exists
    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    const newMovie = new Movie({ name, releaseDate });
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(400).json({ message: "Error adding movie", error });
  }
};

// Edit a movie
export const editMovie = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name, releaseDate } = req.body;

    // Check if the movie exists
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { name, releaseDate },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    res.status(400).json({ message: "Error updating movie", error });
  }
};

// Delete a movie
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    // Check if the movie exists
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting movie", error });
  }
};
