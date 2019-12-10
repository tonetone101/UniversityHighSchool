// for parents to register their kids for this school
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const registerSchema = new mongoose.Schema({
    parentName: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentBirthday: {
        type: String,
        required: true,
    },
    genderIdentity: {
        type: String
    },
    studentRace: {
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

module.exports = mongoose.model("Register", registerSchema);