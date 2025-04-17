const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    classJoin: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true}],
    ClassCreate: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true}],
    isdelete: {type: Boolean, default: false},
    
},{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);
module.exports = User;