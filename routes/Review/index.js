import express from 'express';
import { getReviewsByProduct, createReview } from '../../controller/Reviews/index.js';
import protect from '../../middleware/UserAuth.js';
const router=express.Router();

router.route('/product/:productId').get(getReviewsByProduct).post(protect,createReview)

export default router