// to show all new application
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const khmerapplicationSchema = new mongoose.Schema({
    name: {
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

module.exports = mongoose.model("KhmerApplication", khmerapplicationSchema);