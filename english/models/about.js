const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const aboutSchema = new mongoose.Schema({
    body: {
        type: String,
        
    },
    paragraph2: {
        type: String,
        
    },
    paragraph3: {
        type: String,
        
    },
    paragraph4: {
        type: String,
        
    },
    paragraph5: {
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

module.exports = mongoose.model("About", aboutSchema);