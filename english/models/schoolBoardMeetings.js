const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const schoolBoardMeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    date: {
        type: String,
        
    },
    time: {
        type: String,
        
    },
    where: {
        type: String,
        
    },
    body: {
        type: String,
        
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    url: {
        type: String,
        
    },
    docUrl: {
        type: String,
        
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