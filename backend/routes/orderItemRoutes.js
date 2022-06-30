const express = require('express')
const {protect,admin} = require('../middleware/authMiddleware')
const router = express.Router()
const {createOrderItems,getOrderItems,getOrderItemsById,updateOrderItems,deleteOrderItems} = require('../controllers/orderItemController')


router.route('/orderItems').post(protect,createOrderItems).get(protect,getOrderItems)
router.route('/orderItems/:id').get(protect,getOrderItemsById).delete(protect,deleteOrderItems).put(protect,updateOrderItems)


module.exports = router;