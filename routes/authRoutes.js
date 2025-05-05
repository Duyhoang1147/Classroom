const authController = require('../controller/authController');
const express = require('express');
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/user', authController.getUser);

module.exports = router;