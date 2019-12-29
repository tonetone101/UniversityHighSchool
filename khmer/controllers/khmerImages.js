const KhmerImages = require('../models/khmerImages');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getkhmerImages = (req, res, next) => {
   
    const khmerImages = KhmerImages.find()
        // .populate("postedBy", "_id name photo role ")
        .select("_id caption photo created")
        .sort({ created: -1 })
        .then(khmerImages => {
           res.json(khmerImages)
        })
        .catch(err => console.log(err));
      
};

exports.khmerImageById = (req, res, next, id) => {
    KhmerImages.findById(id)
        .populate('postedBy', '_id name role')
        .select("_id caption photo created")
        .exec((err, khmerImage) => {
            if (err || !khmerImage) {
                return res.status(400).json({
                    error: err
                });
            }
            req.khmerImages = khmerImage;
            next();
        });
};

exports.createkhmerImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'khmerImage could not be uploaded'
            });
        };
        let khmerImage = new KhmerImages(fields);
    
        // req.profile.hashed_password = undefined;
        // req.profile.salt = undefined;
        khmerImage.postedBy = req.profile;
        if (files.photo) {
            khmerImage.photo.data = fs.readFileSync(files.photo.path);
            khmerImage.photo.contentType = files.photo.type;
        }
        khmerImage.save((err, result) => {
            res.json(result);
        });
    });
};

exports.updatekhmerImages = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let khmerImage = req.khmerImages;
        khmerImage = _.extend(khmerImage, fields);
        khmerImage.updated = Date.now();

        if (files.photo) {
            khmerImage.photo.data = fs.readFileSync(files.photo.path);
            khmerImage.photo.contentType = files.photo.type;
        }

        khmerImage.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(khmerImage);
        });
    });
};

exports.isAdmin = (req, res, next) => {
    let sameUser = req.khmerImages && req.auth && req.khmerImages.postedBy._id == req.auth._id;
    let adminUser = req.khmerImages && req.auth && req.auth.role === 'admin';

    console.log("req.khmerImages ", req.khmerImages, " req.auth ", req.auth);
    console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    let isAdmin = sameUser || adminUser;

    if (!isAdmin) {
        return res.status(403).json({
            error: 'User is not authorized'
        });
    }
    next();
};

exports.deletekhmerImage = (req, res) => {
    let khmerImage = req.khmerImages;
    khmerImage.remove((err, khmerImage) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'khmerImage deleted successfully'
        });
    });
};

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.khmerImages.photo.contentType);
    return res.send(req.khmerImages.photo.data);
};

exports.singlekhmerImage = (req, res) => {
    return res.json(req.khmerImages);
};