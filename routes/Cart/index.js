import express from "express"
import { getCartItems } from "../../controller/Cart/index.js"

const router=express.Router()

router.route('/:id').get(getCartItems)

export default router