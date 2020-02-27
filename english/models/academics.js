const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const academicsSchema = new mongoose.Schema({
    intro: {
        type: String,       
    },
    paragraph1: {
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
    uploadedBy: {
        type: ObjectId,
        ref: "User"
    },
    grade9Expect: {
        type: String,       
    },
    grade9Curric: {
        type: String,       
    },
    grade10Expect: {
        type: String,       
    },
    grade10Curric: {
        type: String,       
    },
    grade11Expect: {
        type: String,       
    },
    grade11Curric: {
        type: String,       
    },
    grade12Expect: {
        type: String,       
    },
    grade12Curric: {
        type: String,       
    },
})

module.exports = mongoose.model("Academics", academicsSchema);