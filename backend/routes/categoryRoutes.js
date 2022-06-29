const express = require('express')
const { categories, getCategoryById, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()

router.route('/categories').post(categories).get(getAllCategory)
router.route('/categories/:id').get(getCategoryById).delete(deleteCategory).put(updateCategory)


module.exports = router;