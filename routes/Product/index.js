import express from 'express'
import { createProducts, getAllProducts, getProductByBrand, getProductById, getProductByName, getTopProducts } from '../../controller/Product/index.js'

const router=express.Router()

router.route('/').get(getAllProducts)
router.route('/search').get(getProductByName)
router.route('/:productId').get(getProductById)
router.route('/search-brand').get(getProductByBrand)
router.route('/create').post(createProducts)
router.route('/top-products').get(getTopProducts)

export default router