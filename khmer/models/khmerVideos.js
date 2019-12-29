// to show all videos of school
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const khmerVideosSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    video: {
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

module.exports = mongoose.model("KhmerVideos", khmerVideosSchema);