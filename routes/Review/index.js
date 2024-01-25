import express from 'express';
import { getReviewsByProduct, createReview } from '../../controller/Reviews/index.js';

const router=express.Router();

router.route('/product/:productId').get(getReviewsByProduct).post(createReview)

export default router