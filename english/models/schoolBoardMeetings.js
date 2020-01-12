const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const schoolBoardMeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
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
    url: {
        type: String,
        required: true,
    },
    docUrl: {
        type: String,
        required: true,
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

module.exports = mongoose.model("SchoolBoardMeeting", schoolBoardMeetingSchema);