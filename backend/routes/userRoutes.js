const express = require('express');
const validateToken = require('../middlewear/validateTokenHandler');
const router = express.Router();
const {getAllUser,newUser,loginUser,currentUser,getUserById,updateUser,addAddress} = require('../controllers/userController');


router.route("/").get(getAllUser);
router.route("/byId/:id").get(getUserById);
router.route("/register").post(newUser);
router.route("/login").post(loginUser);
router.post("/update/:id", validateToken, updateUser);
router.post("/address/add", validateToken, addAddress);
router.get("/current", validateToken, currentUser);

module.exports = router;