const express = require('express')
const {getProducts,createProduct, getProductsById, getProductsByCategoryId, updateProducts, deleteProducts, featuredProduct} = require('../controllers/productController')
const router = express.Router()

router.route('/products').post(createProduct).get(getProducts)
router.route('/products/:id').get(getProductsById).put(updateProducts).delete(deleteProducts)
router.route('/products/categories/:id').get(getProductsByCategoryId)
router.route('/products/features').get(featuredProduct)



module.exports = router;