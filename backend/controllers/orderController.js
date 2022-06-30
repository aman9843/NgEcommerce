const asyncHandler = require("express-async-handler");
const db = require("../models");
const Orders = db.Orders;
const OrderItems = db.OrderItems;
const Users = db.Users

// Create a Product
const createOrder = asyncHandler(async (req, res) => {
  const {

    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    datedOrder
    
   
  } = req.body;

  const { OrderItemId, UserId } = req.body;
  if (!OrderItemId) return res.status(400).json({ message: "Invalid Product" });
  if (!UserId) return res.status(400).json({ message: "Invalid User" });

  const creatOrder = await Orders.create({
    
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    datedOrder,
    OrderItemId,
    UserId
  });

  if (creatOrder) {
    res.status(201).json({
        creatOrder,
    });
  } else {
    res.status(400);
    throw new Error("Orders Not Added");
  }
});

// get All  Products with Categories
const getOrder = asyncHandler(async (req, res) => {
  const orders = await Orders.findAll({
    include: [
      {
        model: OrderItems,
        model: Users
      },
    ],
  });

  if (orders) {
    res.status(201).json({
        orders,
    });
  } else {
    res.status(400).json;
    throw new Error("No Orders Found");
  }
});

// Get Single Product

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Orders.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: OrderItems,
        model: Users
      },
    ],
  });

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("orders Not Found");
  }
});






// Update Orders 

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findByPk(req.params.id);

  if (order) {

   order.shippingAddress1 = order.shippingAddress1 || req.body.shippingAddress1,
    order.shippingAddress2 = order.shippingAddress2 || req.body.shippingAddress2, 
    order.city = order.city || req.body.city,
    order.zip = order.zip || req.body.zip,
    order.country = order.country || req.body.country,
    order.phone = order.phone || req.body.phone,
    order.status = order.status || req.body.status,
    order.totalPrice = order.totalPrice || req.body.totalPrice,
    order.datedOrder = order.datedOrder || req.body.datedOrder
   

    

    const updateOrder = await Orders.save();
    res.status(201).json({
        updateOrder,
    });
  } else {
    res.status(400);
    throw new Error("Updation Failed");
  }
});

// Update Order Status 
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Orders.findByPk(req.params.id);

  if (order) {

 
    order.status = order.status || req.body.status

    const updateOrderStatus = await Orders.save();

    res.status(201).json({
        updateOrderStatus,
    });
  } else {
    res.status(400);
    throw new Error("Updation Failed");
  }
});

// Delete Category by Id

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Orders.findByPk(req.params.id);

  if (order) {
    await Orders.destroy();
    res.status(201).json({ message: "Orders Deleted Successfully" });
  } else {
    res.status(400);
    throw new Error("Error in Deleting the OrderItem");
  }
});




module.exports = {
createOrder,
getOrder,
getOrderById,
updateOrder,
updateOrderStatus,
deleteOrder
};
