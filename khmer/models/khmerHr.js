const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const khmerhrSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    docUrl: {
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

module.exports = mongoose.model("KhmerHr", khmerhrSchema);