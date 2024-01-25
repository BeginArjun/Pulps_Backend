import express from 'express'
import { createProducts, getAllProducts, getProductByBrand, getProductById, getProductByName } from '../../controller/Product/index.js'

const router=express.Router()

router.route('/').get(getAllProducts)
router.route('/:productId').get(getProductById)
router.route('/search-brand').get(getProductByBrand)
router.route('/search').get(getProductByName)
router.route('/create').post(createProducts)

export default router