const User = require('../models/user');

const checkUsername = require('../utils/checkUserById');

//Get all users
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

//Get one user by id
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

//create one user
exports.createUser = async (req, res) => {
    const {username, password, email, roleid} = req.body;
    try {
        //check data input
        const existingEmail = await User.findOne({ email });
        if(existingEmail.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        if(await checkUsername(username) === false) {
            return res.status(400).json({ message: 'Invalid username' });
        }
        //create user
        await User.create({ username: username, password: password, email: email, role: roleid });

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

//update one user by id
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const userUpdate = await User.findByIdAndUpdate(id, { username: username }, { new: true });
        if (userUpdate === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({message: 'User updated successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

//ban user by id
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndUpdate(id, { isdeleted: true }, { new: true });
        if (deletedUser === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

//remove user by id
exports.removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userRemove = await User.findByIdAndDelete(id);
        if(userRemove === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing user', error });
    }
}

//restore user by id
exports.restoreUser = async (req, res) => {
    const { id } = req.params;
    try {
        const restoredUser = await User.findByIdAndUpdate(id, { isdeleted: false }, { new: true });
        if (restoredUser === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(restoredUser);
    }  catch (error) {
        res.status(500).json({ message: 'Error restoring user', error });
    }
}