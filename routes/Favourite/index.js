import express from 'express';
import protect from '../../middleware/UserAuth.js';
import { addFavourite, deleteFav, getFav } from '../../controller/Favourite/index.js';
const router=express.Router();

router.route('/create').post(protect,addFavourite)

router.route('/').get(protect,getFav)
router.route('/delete').delete(protect,deleteFav)
export default router;