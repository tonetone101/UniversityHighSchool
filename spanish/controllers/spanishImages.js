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
        .exec((err, spanishImage) => {
            if (err || !spanishImage) {
                return res.status(400).json({
                    error: err
                });
            }
            req.spanishImages = spanishImage;
            next();
        });
};

exports.createspanishImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'spanishImage could not be uploaded'
            });
        };
        let spanishImage = new SpanishImages(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        spanishImage.postedBy = req.profile;
        if (files.photo) {
            spanishImage.photo.data = fs.readFileSync(files.photo.path);
            spanishImage.photo.contentType = files.photo.type;
        }
        spanishImage.save((err, result) => {
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
        let spanishImage = req.spanishImages;
        spanishImage = _.extend(spanishImage, fields);
        spanishImage.updated = Date.now();

        if (files.photo) {
            spanishImage.photo.data = fs.readFileSync(files.photo.path);
            spanishImage.photo.contentType = files.photo.type;
        }

        spanishImage.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(spanishImage);
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

exports.deletespanishImages = (req, res) => {
    let spanishImage = req.spanishImages;
    spanishImage.remove((err, spanishImage) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'spanishImage deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.spanishImages.photo.contentType);
    return res.send(req.spanishImages.photo.data);
};

exports.singlespanishImage = (req, res) => {
    return res.json(req.spanishImages);
};