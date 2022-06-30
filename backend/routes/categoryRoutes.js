const express = require('express')
const { categories, getCategoryById, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/categories').post(protect,admin,categories).get(protect,getAllCategory)
router.route('/categories/:id').get(protect,getCategoryById).delete(protect,admin,deleteCategory).put(protect,admin,updateCategory)


module.exports = router;