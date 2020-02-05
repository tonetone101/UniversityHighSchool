// student section that consist of resources and policies for students as content
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const studentSchema = new mongoose.Schema({
    parent: {
        type: String,
        required: true,
    },
    student: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

module.exports = mongoose.model("Student", studentSchema);