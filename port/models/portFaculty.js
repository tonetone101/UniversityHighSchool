// to show all faculty members
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const PortFacultySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

module.exports = mongoose.model("PortFaculty", PortFacultySchema);