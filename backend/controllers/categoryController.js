const asyncHandler = require("express-async-handler");
const db = require("../models");
const Categories = db.Categories;

/// Add Categories

const categories = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body;

  const category = await Categories.create({
    name,
    icon,
    color,
  });

  if (category) {
    res.status(201).json({
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
  } else {
    res.status(400);
    throw new Error("Categories Can't be created");
  }
});


// get categories by id

const getCategoryById = asyncHandler(async(req,res)=> {
    const category = await Categories.findByPk(req.params.id)

    if(category) {
        res.status(201).json({
            category
        })
    } else {
        res.status(400);
        throw new Error("Category Not Found")
    }
})


// Get All Category 

const getAllCategory = asyncHandler(async(req,res) => {
    const category = await Categories.findAll({});
    if(category ) {
        res.status(201).json({
            category
        })
    } else {
        res.status(400);
        throw new Error("No Category Found")
    }
})



// Delete Category by Id

const deleteCategory = asyncHandler(async(req,res) => {
    const category = await Categories.findByPk(req.params.id);

    if(category) {
        await Categories.destroy();
        res.status(201).json({message:"Category Deleted Successfully"})
    } else {
        res.status(400);
        throw new Error("Error in Deleting the Category")
    }
}) 



// update Category 


const updateCategory = asyncHandler(async(req,res) => {
    const category = await Categories.findByPk(req.params.id)

    if(category) {

        category.name = req.body.name || category.name;
        category.icon = req.body.icon || category.icon;
        category.color = req.body.color || category.color

       const updateCategory = await category.save();
       res.status(201).json({

        updateCategory

       })
        
    } else {
        res.status(400);
        throw new Error("Updation Failed")
    }
})




module.exports = {updateCategory,deleteCategory,getAllCategory,getCategoryById,categories}