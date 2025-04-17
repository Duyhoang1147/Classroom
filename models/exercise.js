const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    classID: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true},
});