const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = require('../controller/userController');
const check_key = require('../utils/checkSK');

const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check_key
        if(!check_key(SECRET_KEY)) return res.status(500).json({ message: "server error" });
        //check email
        const user = await User.findOne({email: email});
        if(user === null) return res.status(400).json({ message: "User not found" });
        //check passwaord
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Password not correct" });

        //create token jwt
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });
        //create cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400000 // 1 day 
        });
        res.status(200).json({ message: "Login successful"});
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" }); 
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

exports.register = async (req, res) => {
    return userController.createUser(req, res);
}

exports.getUser = async (req, res) => {
    //take token from cookie
    const token = req.cookies.token;
    //check token exists
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        //check_key
        if(!check_key(SECRET_KEY)) return res.status(500).json({ message: "server error" });
        //encript token and get user by id
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).select('-password').populate('role', 'roleName');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}

