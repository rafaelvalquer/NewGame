const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/', userController.listUsers);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
