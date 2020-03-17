const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const linksSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    uploadedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

module.exports = mongoose.model("Links", linksSchema);