// student section that consist of resources and policies for students as content
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const HmongStudentSchema = new mongoose.Schema({
    parent: {
        type: String,
        required: true,
    },
    student: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

module.exports = mongoose.model("HmongStudent", HmongStudentSchema);