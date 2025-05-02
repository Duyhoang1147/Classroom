const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    isdeleted: { type: Boolean, default: false },
},{
    timestamps: true,
});

module.exports = mongoose.model('Role', roleSchema);