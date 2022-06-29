const asyncHandler = require("express-async-handler");
const db = require("../models");
const Categories = db.Categories;
const Products = db.Products;

// Create a Product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    countInStock,
    brand,
    price,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  const { CategoryId } = req.body;
  if (!CategoryId) return res.status(400).json({ message: "Invalid Category" });

  const createProduct = await Products.create({
    name,
    description,
    richDescription,
    image,
    countInStock,
    brand,
    CategoryId,
    price,
    rating,
    numReviews,
    isFeatured,
  });

  if (createProduct) {
    res.status(201).json({
      createProduct,
    });
  } else {
    res.status(400);
    throw new Error("Products not added");
  }
});

// get All  Products with Categories

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.findAll({
    include: [
      {
        model: Categories,
      },
    ],
  });

  if (products) {
    res.status(201).json({
      products,
    });
  } else {
    res.status(400).json;
    throw new Error("No products Found");
  }
});

// Get Single Product
const getProductsById = asyncHandler(async (req, res) => {
  const products = await Products.findAll({
    where: { id: req.params.id },
    include: [
      {
        model: Categories,
      },
    ],
  });

  if (products) {
    res.status(201).json(products);
  } else {
    res.status(400);
    throw new Error("Product Not Found");
  }
});




//get products by Category Id

const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const products = await Products.findAll({
    where: { CategoryId: req.params.id },
    include: [
      {
        model: Categories,
      },
    ],
  });

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Category Not Found");
  }
});




// Update Products

const updateProducts = asyncHandler(async (req, res) => {
  const products = await Products.findByPk(req.params.id);

  if (products) {
    products.name = products.name || req.body.name;
    products.description = products.description || req.body.description;
    products.richDescription || req.body.richDescription;
    products.image = products.image || req.body.image;
    products.countInStock = products.countInStock || req.body.countInStock;
    products.brand = products.brand || req.body.brand;
    products.price = products.price || req.body.price;
    products.rating = products.rating || req.body.rating;
    products.numReviews = products.numReviews || req.body.numReviews;
    products.isFeatured = products.isFeatured || req.body.isFeatured;

    const updateProducts = await products.save();
    res.status(201).json({
      updateProducts,
    });
  } else {
    res.status(400);
    throw new Error("Updation Failed");
  }
});



// Delete Category by Id

const deleteProducts = asyncHandler(async (req, res) => {
  const products = await Products.findByPk(req.params.id);

  if (products) {
    await Products.destroy();
    res.status(201).json({ message: "Products Deleted Successfully" });
  } else {
    res.status(400);
    throw new Error("Error in Deleting the Products");
  }
});


// Get Featured Products 

const featuredProduct = asyncHandler(async(req,res) => {
  
  const products = await Products.findAll({
    where: {isFeatured : true}
  })

  if(products) {
    res.status(201).json(products)
  }else {
    res.status(400);
    throw new Error("No Matching Products Found")
  }
})


module.exports = {
  createProduct,
  getProducts,
  getProductsById,
  getProductsByCategoryId,
  deleteProducts,
  updateProducts,
  featuredProduct
};
