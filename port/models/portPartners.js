// to show all faculty members
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const portpartnersSchema = new mongoose.Schema({
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

module.exports = mongoose.model("PortPartners", portpartnersSchema);