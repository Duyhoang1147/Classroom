const Role = require('../models/role');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isdeleted: false });       

        if(roles.length === 0) {
            return res.status(404).json({ message: 'No roles found' });
        }
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error });
    }
}

exports.getRolebyId = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findById(id).where({ isdeleted: false });
        if(role === null) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role', error });
    }
};

exports.createRole = async (req, res) => {
    const { roleName } = req.body;
    try {
        const newRole = await Role.create({ roleName });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: 'Error creating role', error });
    }
};

exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { roleName } = req.body;
    try {
        await Role.findByIdAndUpdate(id, { roleName }, { new: true });
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
};

exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await Role.findByIdAndUpdate(id, {isdeleted: true}, { new: true });
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error });
    }
};

exports.removeRole = async (req, res) => {
    const { id } = req.params;
    try {
        await Role.findByIdAndDelete(id);
        res.status(200).json({ message: 'Role removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing role', error });
    }
}

exports.restoreRole = async (req, res) => {
    const { id } = req.params;
    try {
        await Role.findByIdAndUpdate(id, { isdeleted: false }, { new: true });
        res.status(200).json({ message: 'Role restored successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error restoring role', error });
    }
};
