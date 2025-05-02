const userController = require('../controller/userController');
const express = require('express');
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/update/:id", userController.updateUser);
router.put("/delete/:id", userController.deleteUser);
router.put("/restore/:id", userController.restoreUser);
router.delete("/:id", userController.removeUser);

module.exports = router;