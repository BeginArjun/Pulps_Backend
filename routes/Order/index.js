import express from 'express';
import { createOrder, getOrderById } from '../../controller/Order/index.js';
import protect from '../../middleware/UserAuth.js';
const router=express.Router();

router.route('/').get(protect,getOrderById)
router.route('/create').post(protect,createOrder)

export default router;