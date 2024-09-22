const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get all user
//@route GET /api/user
//@access public

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});
//@desc Get all user
//@route GET /api/user/:id
//@access public

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    throw new Error("User ID is mandatory!");
  }

  console.log("get user id", id);

  try {
    const user = await User.findById(id);

    if (user) {
      res.status(200).json({
        _id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        experiance: user.experiance,
        project: user.project,
        // Ensure accesToken is defined or remove if not needed
        // Define this variable appropriately or remove
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500);
    throw new Error("Server error while fetching user!");
  }
});

//@desc create new user
//@route POST /api/user/register
//@access public
const newUser = asyncHandler(async (req, res) => {
 
  let { firstName,lastName, email, password, phone } = req.body;
  
  if (!email || !firstName || !lastName || !password || !phone) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }
  try {
    
    var userCheck = await User.findOne({ email });
  } catch (e) {
    console.log("error", e);
  }
 
         
    if (userCheck) {
        res.status(400);
        throw new Error("User already exist");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword",hashedPassword);
        const user = await User.create({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          address: [],
          experiance: [],
          project: [],
        });
       
        if (user) {
          const accesToken = jwt.sign(
            {
              user: {
                email: user.email,
                name: user.firstName,
                id: user.id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30m",
            }
          );
    
          res.status(200).json({
            _id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            experiance: user.experiance,
            project: user.project,
            accesToken
          });
        } else {
          res.status(400);
          throw new Error("Seller data is not valid!");
        }
      }

 
 
  
});

//@desc user Login
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory!");
  }

  console.log("email", email);
  console.log("password", password);
  try {
    var user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accesToken = jwt.sign(
        {
          user: {
            email: user.email,
            name: user.firstName,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        }
      );
      res.status(200).json(accesToken);
    } else {
      res.status(400).json("Email and password does not match!");
      throw new Error("user email is not registered");
    }
  } catch (e) {
    console.log("error", e);
  }
});

//@desc get current seller info
//@route GET /api/user/current
//@access public

const currentUser = asyncHandler(async (req, res) => {
  console.log("here");
  res.status(200).json(req.user);
});

//@desc update user
//@route POST /api/user/update/:id
//@access public

const updateUser = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Error in updating product");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(400);
    throw new Error("Error in updating product");
  }
});

//@desc add new address
//@route POST /api/user/address/add
//@access public
const addAddress = async (req, res) => {
  const { userId, newAddress } = req.body;

  try {
    console.log("hitting addAddress");
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add new address to the address array
    user.address.push(newAddress);
    await user.save();

    res.status(200).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllUser,
  newUser,
  loginUser,
  currentUser,
  getUserById,
  updateUser,
  addAddress,
};
