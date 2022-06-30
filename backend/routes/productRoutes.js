const express = require('express')
const {getProducts,createProduct, getProductsById, getProductsByCategoryId, updateProducts, deleteProducts, featuredProduct} = require('../controllers/productController')
const {protect,admin} = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/products').post(protect,admin,createProduct).get(protect,getProducts)
router.route('/products/:id').get(protect,getProductsById).put(protect,admin,updateProducts).delete(protect,admin,deleteProducts)
router.route('/products/categories/:id').get(protect,getProductsByCategoryId)
router.route('/products/features').get(protect,featuredProduct)



module.exports = router;