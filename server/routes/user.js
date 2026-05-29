const express= require("express");
const router = express.Router();

const {getUserByRole} = require("../controllers/userController");
const {createUserByAdmin} = require("../controllers/userController");
const {deleteUserBySuperAdmin} = require("../controllers/userController");
const {updateUserByAdmin} = require("../controllers/userController");

const {authenticateToken} = require("../middleware/auth");


router.use(authenticateToken);

router.get("/", getUserByRole);

router.post("/", createUserByAdmin);
router.delete("/:id", deleteUserBySuperAdmin);
router.patch("/:id", updateUserByAdmin);



module.exports = router;