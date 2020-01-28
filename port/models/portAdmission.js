const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const portadmissionSchema = new mongoose.Schema({
    title: {
        type: String,       
    },
    uploadedBy: {
        type: ObjectId,
        ref: "User"
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

module.exports = mongoose.model("PortAdmission", portadmissionSchema);