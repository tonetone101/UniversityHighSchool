const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const linksSchema = new mongoose.Schema({
    body: {
        type: String,
      
    },
    url: {
        type: String,
        require: true
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