const asyncHandler = require("express-async-handler");
const db = require("../models");
const OrderItems = db.OrderItems;
const Products = db.Products;

// Create a Product
const createOrderItems = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    quantity,
    price
   
  } = req.body;

  const { ProductId } = req.body;
  if (!ProductId) return res.status(400).json({ message: "Invalid Product" });

  const creatOrderItems = await OrderItems.create({
    name,
    image,
    quantity,
    price,
    ProductId
  });

  if (creatOrderItems) {
    res.status(201).json({
        creatOrderItems,
    });
  } else {
    res.status(400);
    throw new Error("OrderItems Not Added");
  }
});

// get All  Products with Categories
const getOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await OrderItems.findAll({
    include: [
      {
        model: Products,
      },
    ],
  });

  if (orderItems) {
    res.status(201).json({
        orderItems,
    });
  } else {
    res.status(400).json;
    throw new Error("No OrderItems Found");
  }
});

// Get Single Product

const getOrderItemsById = asyncHandler(async (req, res) => {
  const orderItems = await OrderItems.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Products,
      },
    ],
  });

  if (orderItems) {
    res.status(201).json(orderItems);
  } else {
    res.status(400);
    throw new Error("orderItems Not Found");
  }
});






// Update Products

const updateOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await OrderItems.findByPk(req.params.id);

  if (orderItems) {
    OrderItems.name = OrderItems.name || req.body.name;
    OrderItems.image = OrderItems.image || req.body.image;
    OrderItems.price = OrderItems.price || req.body.price

    const updateOrderItems = await orderItems.save();
    res.status(201).json({
        updateOrderItems,
    });
  } else {
    res.status(400);
    throw new Error("Updation Failed");
  }
});



// Delete Category by Id

const deleteOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await OrderItems.findByPk(req.params.id);

  if (orderItems) {
    await OrderItems.destroy();
    res.status(201).json({ message: "OrderItem Deleted Successfully" });
  } else {
    res.status(400);
    throw new Error("Error in Deleting the OrderItem");
  }
});




module.exports = {
createOrderItems,
getOrderItems,
getOrderItemsById,
updateOrderItems,
deleteOrderItems
};
