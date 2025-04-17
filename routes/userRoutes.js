const userConreoller = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', userConreoller.getAllUser);
router.get('/:id', userConreoller.getUserById);
router.put('/:id', userConreoller.updateUser);
router.post('/', userConreoller.createUser);

module.exports = router;