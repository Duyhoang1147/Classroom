const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    isdeleted: { type: Boolean, default: false },
},{
    timestamps: true,
});

moodule.exports = mongoose.model('Role', roleSchema);