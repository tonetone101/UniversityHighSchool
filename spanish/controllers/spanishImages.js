const SpanishImages = require('../models/spanishImages');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getspanishImages = (req, res, next) => {
   
    const spanishImages = SpanishImages.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption photo created")
        .sort({ created: -1 })
        .then(spanishImages => {
           res.json(spanishImages)
        })
        .catch(err => console.log(err));
      
};

exports.spanishImageById = (req, res, next, id) => {
    SpanishImages.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption photo created")
        .exec((err, image) => {
            if (err || !image) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishImages = image;
            next();
        });
};

exports.createspanishImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        };
        let image = new SpanishImages(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        image.postedBy = req.profile;
        if (files.photo) {
            image.photo.data = fs.readFileSync(files.photo.path);
            image.photo.contentType = files.photo.type;
        }
        image.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatespanishImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let image = req.spanishImages;
        image = _.extend(image, fields);
        image.updated = Date.now();

        if (files.photo) {
            image.photo.data = fs.readFileSync(files.photo.path);
            image.photo.contentType = files.photo.type;
        }

        image.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(image);
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.spanishImages && req.auth && req.spanishImages.postedBy._id == req.auth._id;
    let adminUser = req.spanishImages && req.auth && req.auth.role === 'admin';

    console.log("req.spanishImages ", req.spanishImages, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deleteSpanishImages = (req, res) => {
    let image = req.spanishImages;
    image.remove((err, image) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Image deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishImages.photo.contentType);
    return res.send(req.spanishImages.photo.data);
};

exports.singleSpanishImages = (req, res) => {
    return res.json(req.spanishImages);
};