import express from "express"
import { getCartItems,addCart,updateCart, deleteCart } from "../../controller/Cart/index.js"
import protect from "../../middleware/UserAuth.js"
const router=express.Router()

router.route('/').get(protect,getCartItems)
router.route('/').patch(protect,addCart)
router.route('/update').patch(protect,updateCart)
router.route('/delete').delete(protect,deleteCart)

export default router