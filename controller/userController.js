const User = require('../models/user');

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({isdelete: false})
        if(users === null) {
            res.status(404).json({message: "not found"});
        }

        res.status(200).json({users});
    } catch(err) {
        res.status(500).json({message: "server error: " + err.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({_id: id, isdelete: false});
        if(user === null) {
            res.status(404).json({message: "not found"});
        }

        res.status(200).json({user});
    } catch(err) {
        res.status(500).json({message: "server error: " + err.message});
    }
}

const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            res.status(400).json({message: "bad request"});
        }

        await User.create({username, email, password});
        if(user === null) {
            res.status(404).json({message: "cannot create user"});
        }
        res.status(201).json({message: "user created"});
    } catch(err) {
        res.status(500).json({message: "server error: " + err.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            res.status(400).json({message: "bad request"});
        }

        const user = await User.findByIdAndUpdate(id, {username, email, password}, {new: true});
        if(user === null) {
            res.status(404).json({message: "cannot update user"});
        }
        res.status(200).json({message: "user updated"});
    } catch(err) {
        res.status(500).json({message: "server error: " + err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, {isdelete: true}, {new: true});
        if(user === null) {
            res.status(404).json({message: "cannot delete user"});
        }
        res.status(200).json({message: "user deleted"});
    } catch(err) {
        res.status(500).json({message: "server error: " + err.message});
    }
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}