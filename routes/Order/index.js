import express from 'express';
import { createOrder, getOrderById } from '../../controller/Order/index.js';

const router=express.Router();

router.route('/:id').get(getOrderById)
router.route('/create/:userId').post(createOrder)

export default router;