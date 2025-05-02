const roleController = require('../controller/roleController');
const express = require('express');
const router = express.Router();

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRolebyId);
router.post('/', roleController.createRole);
router.put('update/:id', roleController.updateRole);
router.put('delete/:id', roleController.deleteRole);
router.put('remove/:id', roleController.removeRole);
router.delete('/:id', roleController.removeRole);
