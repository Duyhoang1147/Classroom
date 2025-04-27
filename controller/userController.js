const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isdeleted: false }).populate('role');
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id, isdeleted: false }).populate('role');
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

exports.createUser = async (req, res) => {
    const {username, password, email, role} = req.body;
    try {
        const newUser = await User.create({ username, password, email, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}
