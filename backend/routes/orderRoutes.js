const express = require('express')
const {protect,admin} = require('../middleware/authMiddleware')
const router = express.Router()
const {getOrder,getOrderById,createOrder,updateOrder,deleteOrder, updateOrderStatus} = require('../controllers/orderController')

router.route('/order').post(protect,createOrder).get(protect,getOrder)
router.route('/order/:id').get(protect,getOrderById).put(protect,updateOrder).delete(protect,deleteOrder).put(protect,admin,updateOrderStatus)