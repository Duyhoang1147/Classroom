const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {type: String, required: true},
    description: {type: String, required: true},
    userCreate: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    menbers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

},{
    timestamps: true,
})

const Class = mongoose.model('Class', classSchema);
module.exports = Class;