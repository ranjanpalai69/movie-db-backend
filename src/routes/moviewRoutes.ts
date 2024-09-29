

import express from 'express';
import { getAllMovies, addMovie, editMovie, deleteMovie } from '../controllers/movieController';

const router = express.Router();

router.get('/movies', getAllMovies);
router.post('/movies', addMovie);
router.put('/movies/:id', editMovie);
router.delete('/movies/:id', deleteMovie);

export default router;
