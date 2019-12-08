// for admin to add events for parents and other visitors to view
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    when: {
        type: String,
        required: true,
    },
    where: {
        type: String,
        required: true,
    },
    body: {
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

module.exports = mongoose.model("Event", eventSchema);