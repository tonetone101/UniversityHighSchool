const Carousel = require('../models/carousel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getCarousel = (req, res, next) => {
   
    const carousel = Carousel.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 created")
        .sort({ created: -1 })
        .then(carousel => {
           res.json(carousel)
        })
        .catch(err => console.log(err));
      
};

exports.imageById = (req, res, next, id) => {
    Carousel.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption1 photo1 caption2 photo2 caption3 photo3 created")
        .exec((err, carousel) => {
            if (err || !carousel) {
                return res.status(400).json({
                    error: err
                });
            }
            req.carousel = carousel;
            next();
        });
};

exports.createCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let carousel = new Carousel(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        carousel.postedBy = req.profile;
        if (files.photo) {
            carousel.photo.data = fs.readFileSync(files.photo.path);
            carousel.photo.contentType = files.photo.type;
        }
        carousel.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updateCarousel = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let carousel = req.carousel;
        carousel = _.extend(carousel, fields);
        carousel.updated = Date.now();

        if (files.photo) {
            carousel.photo.data = fs.readFileSync(files.photo.path);
            carousel.photo.contentType = files.photo.type;
        }

        carousel.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(carousel);
        });
    });
};

exports.deleteCarousel = (req, res) => {
    let carousel = req.carousels;
    carousel.remove((err, carousel) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Carousel deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.carousel.photo.contentType);
    return res.send(req.carousel.photo.data);
};

exports.singleCarousel = (req, res) => {
    return res.json(req.Carousel);
};