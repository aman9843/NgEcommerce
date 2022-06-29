const asyncHandler = require('express-async-handler')
const db = require('../models')
const User = db.Users


// Registeration


const registeredUser = asyncHandler(async(req,res) => {
    const {name,email,phoneNo,password,cpassword,city,country} = req.body
    const userExist = await User.findOne({where:{ email }});

    if (userExist) {
      res.status(400);
      throw new Error("User Already Exist");
      // throw (new ErrorHandler("User Not Exist", 400));
    }
  
    const user = await User.create({
      name,
      email,
      password,
      cpassword,
      phoneNo,
      city,
      country
    });
  
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phoneNo:user.phoneNo,
        city:user.city,
        country:user.country,
        token: generateToken(user.id)
      });
    } else {
      res.status(400);
    
     throw new Error("Invalid Data")
    }
})



// Login 
const login = asyncHandler(async(req,res) => {
  const {email,password} = req.body;

  const user = await User.findOne({where:{email}})
 
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      city: user.city,
      country:user.country,
      phoneNo:user.phoneNo,
      isAdmin: user.isAdmin,
      enabled:user.enabled,
      token: generateToken(user.id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email & Password ");
  }
})



// Get All User

const getAllUser = asyncHandler(async(req,res) => {
  const user = await User.findAll({});
  if(user) {
      res.status(201).json({
          user
      })
  } else {
      res.status(400);
      throw new Error("No User Found")
  }
})


// get particular user


const getUserById = asyncHandler(async(req,res)=> {
  const user = await User.findByPk(req.params.id)

  if(user) {
      res.status(201).json({
          user
      })
  } else {
      res.status(400);
      throw new Error("user Not Found")
  }
})


// Delete Category

const deleteUser = asyncHandler(async(req,res) => {
  const user = await User.findByPk(req.params.id);

  if(user) {
      await User.destroy();
      res.status(201).json({message:"Category Deleted Successfully"})
  } else {
      res.status(400);
      throw new Error("Error in Deleting the Category")
  }
}) 


// Update Category 

const updateUser = asyncHandler(async(req,res) => {
  const user = await User.findByPk(req.params.id)

  if(user) {

      user.name = req.body.name || user.nameemail
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password
      user.cpassword = req.body.cpassword || user.cpassword
      user.city = req.body.city || user.city
      user.country = req.body.country || user.country
      user.phoneNo = req.body.phoneNo || user.phoneNo
      user.isAdmin = req.body.isAdmin || user.isAdmin
     

     const updateUser = await user.save();
     res.status(201).json({

      updateUser

     })
      
  } else {
      res.status(400);
      throw new Error("Updation Failed")
  }
})



module.exports = {registeredUser,login,getAllUser,getUserById,updateUser,deleteUser}