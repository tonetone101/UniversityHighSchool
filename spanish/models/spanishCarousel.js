// to update images of the carousel
// carousel will be on the landing page
// user will be able to update each image with a caption
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const spanishCarouselSchema = new mongoose.Schema({
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
    link1: {
        type: String,
    },
    link2: {
        type: String,
    },
    link3: {
        type: String,
    },
    doc1: {
        type: String,
    },
    doc2: {
        type: String,
    },
    doc3: {
        type: String,
    },
    linkTitle1: {
        type: String,
    },
    linkTitle2: {
        type: String,
    },
    linkTitle3: {
        type: String,
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

module.exports = mongoose.model("SpanishCarousel", spanishCarouselSchema);