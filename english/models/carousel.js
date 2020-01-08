// to update images of the carousel
// carousel will be on the landing page
// user will be able to update each image with a caption
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const carouselSchema = new mongoose.Schema({
    caption1: {
        type: String,
    },
    photo1: {
        data: Buffer,
        contentType: String
    },
    caption2: {
        type: String,
    },
    photo2: {
        data: Buffer,
        contentType: String
    },
    caption3: {
        type: String,
    },
    caption4: {
        type: String,
    },
    caption5: {
        type: String,
    },
    caption6: {
        type: String,
    },
    photo3: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    missionStatement: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

module.exports = mongoose.model("Carousel", carouselSchema);