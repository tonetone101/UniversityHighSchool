const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const admissionSchema = new mongoose.Schema({
    title: {
        type: String,       
    },
    comments: [
        {
            text: String,
            created: {
                type: Date,
                default: Date.now
            },
            uploadedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ]
})

module.exports = mongoose.model("Admission", admissionSchema);