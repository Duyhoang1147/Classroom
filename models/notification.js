const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    classID: {type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
});