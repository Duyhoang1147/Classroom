const roleController = require('../controller/roleController');
const express = require('express');
const router = express.Router();

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRolebyId);
router.post('/', roleController.createRole);
router.put('/update/:id', roleController.updateRole);
router.put('/delete/:id', roleController.deleteRole);
router.put('/restore/:id', roleController.restoreRole);
router.delete('/:id', roleController.removeRole);

module.exports = router;