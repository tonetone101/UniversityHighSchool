// to show all images of school
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const PortImagesSchema = new mongoose.Schema({
    caption: {
        type: String,
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

module.exports = mongoose.model("PortImages", PortImagesSchema);