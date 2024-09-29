// import { Router } from 'express';
// import * as reviewController from '../controllers/reviewController';

// const router = Router();

// router.post('/movies/:movieId/reviews', reviewController.addReview);
// router.get('/movies/:movieId/reviews', reviewController.getReviewsForMovie);
// router.put('/reviews/:id', reviewController.updateReview);
// router.delete('/reviews/:id', reviewController.deleteReview);

// export default router;

import express from 'express';
import { getReviewsByMovie, addReview, editReview, deleteReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/movies/:movieId/reviews', getReviewsByMovie);
router.post('/movies/:movieId/reviews', addReview);
router.put('/reviews/:id', editReview);
router.delete('/reviews/:id', deleteReview);

export default router;
