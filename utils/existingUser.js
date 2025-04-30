const User = require('../models/user');

async function existingUser (id) {
    try {
        const user = await User.findById(id)
        if(user === null) { return false; } 
        else { return true; }
    } catch (error) {
        return false;
    }
}

module.exports = existingUser;