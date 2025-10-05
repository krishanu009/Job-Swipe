const asyncHandler = require("express-async-handler");

const Hr = require("../models/hrModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get all user
//@route GET /api/user
//@access public

const getAllUser = asyncHandler(async (req, res) => {
  const user = await Hr.find();
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
    const hr = await Hr.findById(id);

    if (hr) {
      res.status(200).json({
        _id: hr.id,
        email: hr.email,
        firstName: hr.firstName,
        lastName:hr.lastName,
        phone: hr.phone,
        companyImage: hr.companyImage,
        company: hr.company
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
 
  let { firstName,lastName, email, password, phone, company, companyImage } = req.body;
  
  if (!email || !firstName || !lastName || !password || !phone || !company || !companyImage) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }
  try {
    
    var userCheck = await Hr.findOne({ email });
  } catch (e) {
    console.log("error", e);
  }
 
         
    if (userCheck) {
        res.status(400);
        throw new Error("User already exist");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashedPassword",hashedPassword);
        const hr = await Hr.create({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword,
          company,
          companyImage
        });
       
        if (hr) {
          const accesToken = jwt.sign(
            {
              user: {
                email: hr.email,
                name: hr.firstName,
                id: hr.id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30m",
            }
          );
    
          res.status(200).json({
            _id: hr.id,
            email: hr.email,
            firstName: hr.firstName,
            lastName: hr.lastName,
            phone: hr.phone,
            address: hr.address,
            company: hr.company,
            companyImage: hr.companyImage,
            accesToken
          });
        } else {
          res.status(400);
          throw new Error("Hr data is not valid!");
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
    var hr = await Hr.findOne({ email });

    if (hr && (await bcrypt.compare(password, hr.password))) {
      const accesToken = jwt.sign(
        {
          user: {
            email: hr.email,
            name: hr.firstName,
            id: hr.id,
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
  const updatedUser = await Hr.findByIdAndUpdate(req.params.id, req.body, {
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




module.exports = {
  getAllUser,
  newUser,
  loginUser,
  currentUser,
  getUserById,
  updateUser
};
